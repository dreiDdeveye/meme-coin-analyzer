export function LandingTransparency() {
  return (
    <section className="py-20 px-4 bg-card/30 border-y border-border">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Our Platform Model</h2>
            <p className="text-lg text-muted-foreground">Transparent. Sustainable. Focused on Accuracy.</p>
          </div>

          <div className="bg-background/50 border border-border rounded-lg p-8 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Free to Use</h3>
              <p className="text-muted-foreground">
                Complete access to all analysis tools, real-time data, and explainable insights at no cost.
              </p>
            </div>

            <div className="h-px bg-border" />

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">How We Sustain This</h3>
              <p className="text-muted-foreground mb-4">Creator fees are allocated toward:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Adding new analysis features and detection methods</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Improving analysis accuracy and reducing false positives</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Expanding API capabilities and data sources</span>
                </li>
              </ul>
            </div>

            <div className="h-px bg-border" />

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">No Conflicts of Interest</h3>
              <p className="text-muted-foreground">
                We don't hold positions in analyzed coins. We don't promote or recommend tokens. Analysis is pure data
                interpretation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
