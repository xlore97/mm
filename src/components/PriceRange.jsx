import { useState, useEffect, useRef } from "react";
import "./PriceRange.css";

// Componente dedicato alla fascia di prezzo:
// - slider doppio (min/max)
// - input testo con validazione
export default function PriceRange({
  priceRange = { min: 0, max: 0 }, // range attuale (dallo stato del parent)
  onPriceRangeChange = () => {}, // callback per aggiornare il parent
  priceBounds = { min: 0, max: 0 }, // limiti globali (dai prodotti)
}) {
  // testo degli input
  const [minInput, setMinInput] = useState(
    String(priceRange.min || priceBounds.min || 0)
  );
  const [maxInput, setMaxInput] = useState(
    String(priceRange.max || priceBounds.max || 0)
  );

  // errori di validazione (mostrati sotto gli input)
  const [minError, setMinError] = useState("");
  const [maxError, setMaxError] = useState("");

  // slider e gestione drag dei pallini
  const sliderRef = useRef(null);
  const [activeThumb, setActiveThumb] = useState(null); // "min" | "max" | null

  // quando cambia priceRange dall’esterno, sincronizzo gli input
  useEffect(() => {
    setMinInput(String(priceRange.min));
    setMaxInput(String(priceRange.max));
  }, [priceRange.min, priceRange.max]);

  // --------- HELPER NUMERICI ---------

  const clamp = (val, min, max) => {
    if (Number.isNaN(val)) return min;
    return Math.min(Math.max(val, min), max);
  };

  // converte testo in intero; ritorna null se vuoto o non numerico
  const parsePriceInput = (raw) => {
    const trimmed = raw.trim();
    if (trimmed === "") return null;
    const num = parseInt(trimmed, 10);
    if (Number.isNaN(num)) return null;
    return num;
  };

  // --------- INPUT MIN ---------

  // mentre si scrive nell'input:
  // - permetto vuoto
  // - elimino tutto ciò che non è cifra
  // - massimo 5 caratteri
  const handleMinInputChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d]/g, ""); // solo numeri
    if (value.length > 5) value = value.slice(0, 5);
    setMinInput(value);
    setMinError(""); // cancello eventuali errori mentre digito
  };

  // applico il valore scritto nel campo Minimo
  const applyMinFromInput = () => {
    const parsed = parsePriceInput(minInput);

    if (parsed === null) {
      // vuoto o non numerico -> errore e reset al valore attuale
      setMinError("Valore non valido");
      setMinInput(String(priceRange.min));
      return;
    }

    // controllo range logico: non può superare max-1
    const safe = clamp(parsed, priceBounds.min, priceRange.max - 1);

    if (safe !== parsed) {
      setMinError("Valore fuori intervallo");
    } else {
      setMinError("");
    }

    setMinInput(String(safe));
    onPriceRangeChange({ ...priceRange, min: safe });
  };

  const handleMinInputBlur = () => {
    applyMinFromInput();
  };

  const handleMinInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyMinFromInput();
      e.target.blur();
    }
  };

  // --------- INPUT MAX ---------

  const handleMaxInputChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d]/g, ""); // solo numeri
    if (value.length > 5) value = value.slice(0, 5);
    setMaxInput(value);
    setMaxError("");
  };

  const applyMaxFromInput = () => {
    const parsed = parsePriceInput(maxInput);

    if (parsed === null) {
      setMaxError("Valore non valido");
      setMaxInput(String(priceRange.max));
      return;
    }

    const safe = clamp(parsed, priceRange.min + 1, priceBounds.max);

    if (safe !== parsed) {
      setMaxError("Valore fuori intervallo");
    } else {
      setMaxError("");
    }

    setMaxInput(String(safe));
    onPriceRangeChange({ ...priceRange, max: safe });
  };

  const handleMaxInputBlur = () => {
    applyMaxFromInput();
  };

  const handleMaxInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyMaxFromInput();
      e.target.blur();
    }
  };

  // --------- SLIDER CUSTOM DOPPIO PALLINO ---------

  const span = priceBounds.max - priceBounds.min || 1;
  const minPercent = ((priceRange.min - priceBounds.min) / span) * 100;
  const maxPercent = ((priceRange.max - priceBounds.min) / span) * 100;

  // converte posizione X del mouse in valore di prezzo
  const positionToValue = (clientX) => {
    if (!sliderRef.current) return priceBounds.min;
    const rect = sliderRef.current.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const clampedRatio = Math.min(Math.max(ratio, 0), 1);
    const value = priceBounds.min + clampedRatio * span;
    return Math.round(value);
  };

  // gestione drag globale
  useEffect(() => {
    if (!activeThumb) return;

    const handleMove = (e) => {
      const newValue = positionToValue(e.clientX);

      if (activeThumb === "min") {
        const safeMin = clamp(newValue, priceBounds.min, priceRange.max - 1);
        onPriceRangeChange({ ...priceRange, min: safeMin });
      } else if (activeThumb === "max") {
        const safeMax = clamp(newValue, priceRange.min + 1, priceBounds.max);
        onPriceRangeChange({ ...priceRange, max: safeMax });
      }
    };

    const handleUp = () => {
      setActiveThumb(null);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [
    activeThumb,
    priceBounds.min,
    priceBounds.max,
    priceRange,
    onPriceRangeChange,
  ]);

  const handleThumbMouseDown = (e, which) => {
    e.preventDefault();
    setActiveThumb(which); // "min" o "max"
  };

  return (
    <>
      {/* Slider custom con due pallini */}
      <div className="price-slider-row">
        <div className="custom-slider" ref={sliderRef}>
          {/* track grigia di base */}
          <div className="slider-track-base" />

          {/* track rossa tra min e max */}
          <div
            className="slider-track-active"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />

          {/* pallino sinistro (min) */}
          <button
            type="button"
            className="slider-thumb slider-thumb-min"
            style={{ left: `${minPercent}%` }}
            onMouseDown={(e) => handleThumbMouseDown(e, "min")}
          />

          {/* pallino destro (max) */}
          <button
            type="button"
            className="slider-thumb slider-thumb-max"
            style={{ left: `${maxPercent}%` }}
            onMouseDown={(e) => handleThumbMouseDown(e, "max")}
          />
        </div>
      </div>

      {/* input testuali per min / max + messaggi errore */}
      <div className="price-input-row">
        <div className="price-input-wrapper">
          <label className="price-label">Minimo</label>
          <input
            type="text"
            className="price-input"
            value={minInput}
            onChange={handleMinInputChange}
            onBlur={handleMinInputBlur}
            onKeyDown={handleMinInputKeyDown}
          />
          {minError && <span className="price-error">{minError}</span>}
        </div>

        <div className="price-input-wrapper">
          <label className="price-label">Massimo</label>
          <input
            type="text"
            className="price-input"
            value={maxInput}
            onChange={handleMaxInputChange}
            onBlur={handleMaxInputBlur}
            onKeyDown={handleMaxInputKeyDown}
          />
          {maxError && <span className="price-error">{maxError}</span>}
        </div>
      </div>
    </>
  );
}
