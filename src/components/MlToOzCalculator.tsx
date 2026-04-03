"use client";

import { useMemo, useState } from "react";

const quickValues = [15, 30, 50, 100, 250, 500, 750, 1000];

function roundValue(value: number) {
  return Number(value.toFixed(4));
}

export default function MlToOzCalculator() {
  const [milliliters, setMilliliters] = useState("100");

  const parsedMl = Number(milliliters);
  const safeMl = Number.isFinite(parsedMl) ? parsedMl : 0;

  const conversion = useMemo(() => {
    const usFluidOunces = safeMl * 0.033814;
    const ukFluidOunces = safeMl * 0.035195;

    return {
      usFluidOunces: roundValue(usFluidOunces),
      ukFluidOunces: roundValue(ukFluidOunces),
      cups: roundValue(safeMl / 236.588),
      tablespoons: roundValue(safeMl / 14.787),
      teaspoons: roundValue(safeMl / 4.929),
    };
  }, [safeMl]);

  return (
    <div className="tool-workspace">
      <div className="tool-main">
        <section className="tool-surface controls-surface">
          <div className="surface-header">
            <h3>ML to oz calculator</h3>
            <p>
              Convert milliliters to US fluid ounces instantly. Helpful for recipes, bottles,
              nutrition labels, drinks, and product measurements in the US.
            </p>
          </div>

          <label className="field-label" htmlFor="ml-input">
            Enter milliliters
          </label>
          <input
            id="ml-input"
            type="number"
            min="0"
            step="0.1"
            value={milliliters}
            onChange={(event) => setMilliliters(event.target.value)}
            className="tool-input"
            placeholder="Enter ml value"
          />

          <label className="field-label">Quick values</label>
          <div className="chip-row">
            {quickValues.map((value) => (
              <button
                key={value}
                type="button"
                className={`chip ${safeMl === value ? "active" : ""}`}
                onClick={() => setMilliliters(String(value))}
              >
                {value} ml
              </button>
            ))}
          </div>

          <p className="control-help">
            1 milliliter = 0.033814 US fluid ounces. For most US recipe and bottle conversions,
            use the US fluid ounce result below.
          </p>
        </section>

        <section className="tool-surface result-surface">
          <div className="surface-header">
            <h3>Conversion results</h3>
            <p>Use the values below for cooking, drinks, packaging, and everyday conversions.</p>
          </div>

          <div className="calculator-result-grid">
            <article className="calculator-result-card">
              <span className="calculator-result-label">US fluid ounces</span>
              <strong>{conversion.usFluidOunces} oz</strong>
              <p>Best choice for US recipes, labels, and bottle measurements.</p>
            </article>

            <article className="calculator-result-card">
              <span className="calculator-result-label">UK fluid ounces</span>
              <strong>{conversion.ukFluidOunces} oz</strong>
              <p>Shown for reference when a source uses Imperial measurements.</p>
            </article>

            <article className="calculator-result-card">
              <span className="calculator-result-label">US cups</span>
              <strong>{conversion.cups} cups</strong>
              <p>Useful when switching from metric packaging to US cooking measures.</p>
            </article>

            <article className="calculator-result-card">
              <span className="calculator-result-label">Tablespoons</span>
              <strong>{conversion.tablespoons} tbsp</strong>
              <p>Helpful for sauces, medicine, and precise kitchen conversions.</p>
            </article>

            <article className="calculator-result-card">
              <span className="calculator-result-label">Teaspoons</span>
              <strong>{conversion.teaspoons} tsp</strong>
              <p>Good for small liquid amounts in recipes and measurement charts.</p>
            </article>
          </div>

          <div className="calculator-note">
            <strong>Popular examples:</strong>
            <p>
              30 ml = 1.0144 oz, 50 ml = 1.6907 oz, 100 ml = 3.3814 oz, 500 ml = 16.907 oz.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
