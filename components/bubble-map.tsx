"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import type { HolderData } from "@/lib/holder-analyzer"

interface BubbleMapProps {
  holders: HolderData[]
  width?: number
  height?: number
  onBubbleClick?: (holder: HolderData) => void
  onBubbleHover?: (holder: HolderData | null) => void
}

export function BubbleMap({ holders, width = 1200, height = 800, onBubbleClick, onBubbleHover }: BubbleMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredHolder, setHoveredHolder] = useState<HolderData | null>(null)

  useEffect(() => {
    if (!svgRef.current || !holders.length) return

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3.select(svgRef.current)
    const g = svg.append("g")

    // Create zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform)
      })

    svg.call(zoom)

    const nodes = holders.map((holder, i) => {
      let cluster = 0
      if (holder.percentage > 5)
        cluster = 1 // Large holders - blue cluster
      else if (holder.percentage > 2)
        cluster = 2 // Medium holders - green/teal cluster
      else cluster = 3 // Small holders - gray

      return {
        ...holder,
        id: holder.address,
        radius: Math.sqrt(holder.percentage) * 12 + 10,
        cluster,
        x: width / 2 + (Math.random() - 0.5) * 200,
        y: height / 2 + (Math.random() - 0.5) * 200,
      }
    })

    // Prepare link data based on interactions
    const links: { source: string; target: string; value: number }[] = []
    holders.forEach((holder) => {
      holder.interactions.forEach((targetAddr) => {
        const target = holders.find((h) => h.address === targetAddr)
        if (target) {
          links.push({
            source: holder.address,
            target: targetAddr,
            value: 1,
          })
        }
      })
    })

    const simulation = d3
      .forceSimulation(nodes as any)
      .force("charge", d3.forceManyBody().strength(-50))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius((d: any) => d.radius + 5),
      )
      .force(
        "x",
        d3
          .forceX((d: any) => {
            if (d.cluster === 1) return width / 2 - 150
            if (d.cluster === 2) return width / 2 + 150
            return width / 2
          })
          .strength(0.3),
      )
      .force(
        "y",
        d3
          .forceY((d: any) => {
            if (d.cluster === 1) return height / 2 + 100
            if (d.cluster === 2) return height / 2 - 100
            return height / 2
          })
          .strength(0.3),
      )
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(80)
          .strength(0.05),
      )

    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#1e3a4a")
      .attr("stroke-opacity", 0.3)
      .attr("stroke-width", 1)

    const getClusterColor = (cluster: number) => {
      if (cluster === 1) return "#3b82f6" // Blue for large holders
      if (cluster === 2) return "#10b981" // Green/teal for medium holders
      return "#4b5563" // Gray for small holders
    }

    const node = g
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d: any) => d.radius)
      .attr("fill", (d: any) => getClusterColor(d.cluster))
      .attr("stroke", (d: any) => {
        if (d.cluster === 1) return "#60a5fa"
        if (d.cluster === 2) return "#34d399"
        return "#6b7280"
      })
      .attr("stroke-width", 2)
      .attr("opacity", 0.7)
      .style("cursor", "pointer")
      .on("mouseenter", function (event, d: any) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 1)
          .attr("stroke-width", 3)
          .attr("r", d.radius * 1.15)

        setHoveredHolder(d)
        onBubbleHover?.(d)
      })
      .on("mouseleave", function (event, d: any) {
        d3.select(this).transition().duration(200).attr("opacity", 0.7).attr("stroke-width", 2).attr("r", d.radius)

        setHoveredHolder(null)
        onBubbleHover?.(null)
      })
      .on("click", (event, d: any) => {
        onBubbleClick?.(d)
      })

    // Add labels for top 10 holders
    const labels = g
      .append("g")
      .selectAll("text")
      .data(nodes.slice(0, 10))
      .join("text")
      .attr("text-anchor", "middle")
      .attr("dy", 4)
      .attr("fill", "#ffffff")
      .attr("font-size", "11px")
      .attr("font-weight", "600")
      .attr("pointer-events", "none")
      .text((d: any) => `#${d.rank}`)

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y)

      labels.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y)
    })

    // Cleanup
    return () => {
      simulation.stop()
    }
  }, [holders, width, height, onBubbleClick, onBubbleHover])

  return (
    <div className="relative">
      <svg ref={svgRef} width={width} height={height} className="bg-black/90 rounded-lg border border-primary/20" />
      {hoveredHolder && (
        <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-md border border-primary/30 rounded-lg p-4 max-w-xs">
          <div className="space-y-2 text-sm font-mono">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">RANK</span>
              <span className="text-primary font-bold">#{hoveredHolder.rank}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">ADDRESS</span>
              <span className="text-primary">{hoveredHolder.address}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">HOLDINGS</span>
              <span className="text-accent font-bold">{hoveredHolder.percentage}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">TYPE</span>
              <span className={hoveredHolder.isContract ? "text-orange-500" : "text-green-500"}>
                {hoveredHolder.isContract ? "CONTRACT" : "WALLET"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
