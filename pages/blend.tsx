import { useState } from "react";
import Layout from "./layout";
import { Card } from "@/components/card";
import Stars from "@/components/star";

interface BlendingResult {
  materialBWeight: number;
  totalWeight: number;
  percentageA: number;
  percentageB: number;
}

export default function Blend() {
  // Input states
  const [materialAWeight, setMaterialAWeight] = useState<number>(0);
  const [materialAGrade, setMaterialAGrade] = useState<number>(0);
  const [materialBGrade, setMaterialBGrade] = useState<number>(0);
  const [desiredBlendedGrade, setDesiredBlendedGrade] = useState<number>(0);
  
  // Result state
  const [result, setResult] = useState<BlendingResult | null>(null);
  const [error, setError] = useState<string>("");

  const calculateBlending = () => {
    setError("");
    setResult(null);

    // Validation
    if (materialAWeight <= 0) {
      setError("Material A weight must be greater than 0");
      return;
    }

    if (materialAGrade < 0 || materialBGrade < 0 || desiredBlendedGrade < 0) {
      setError("Grades cannot be negative");
      return;
    }

    if (materialAGrade > 100 || materialBGrade > 100 || desiredBlendedGrade > 100) {
      setError("Grades cannot exceed 100%");
      return;
    }

    // Check if solution is possible
    const minGrade = Math.min(materialAGrade, materialBGrade);
    const maxGrade = Math.max(materialAGrade, materialBGrade);
    
    if (desiredBlendedGrade < minGrade || desiredBlendedGrade > maxGrade) {
      setError(`Desired grade (${desiredBlendedGrade}%) must be between ${minGrade}% and ${maxGrade}%`);
      return;
    }

    if (materialAGrade === materialBGrade) {
      setError("Material A and B must have different grades for blending calculation");
      return;
    }

    // Calculate Material B weight using the formula:
    // WB = WA × (G1 - G1A) / (G1B - G1)
    const numerator = materialAWeight * (desiredBlendedGrade - materialAGrade);
    const denominator = materialBGrade - desiredBlendedGrade;
    
    if (Math.abs(denominator) < 0.0001) {
      setError("Cannot calculate: Material B grade equals desired grade");
      return;
    }

    const materialBWeight = numerator / denominator;

    if (materialBWeight < 0) {
      setError("Cannot achieve desired grade with these materials. Check if the desired grade is between the two material grades.");
      return;
    }

    const totalWeight = materialAWeight + materialBWeight;
    const percentageA = (materialAWeight / totalWeight) * 100;
    const percentageB = (materialBWeight / totalWeight) * 100;

    setResult({
      materialBWeight,
      totalWeight,
      percentageA,
      percentageB
    });
  };

  const clearCalculation = () => {
    setMaterialAWeight(0);
    setMaterialAGrade(0);
    setMaterialBGrade(0);
    setDesiredBlendedGrade(0);
    setResult(null);
    setError("");
  };

  // Verify the calculation by checking if the blend gives the desired grade
  const verifyCalculation = () => {
    if (!result) return null;
    
    const calculatedGrade = (materialAWeight * materialAGrade + result.materialBWeight * materialBGrade) / 
                           (materialAWeight + result.materialBWeight);
    
    return calculatedGrade;
  };

  const verifiedGrade = verifyCalculation();

  return (
    <Layout>
      <Stars />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-3xl font-bold mb-8 text-center frutiger-metallic-text">Materials Blending Calculator</h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Formula Display */}
          <Card customClassName="mb-8">
            <h2 className="text-2xl font-medium mb-4 frutiger-metallic-text">Formula</h2>
            <div className="bg-green-100/40 p-4 rounded-lg">
              <p className="text-center text-lg mb-2 frutiger-metallic-text">
                G₁ = (W<sub>A</sub> × G₁<sub>A</sub> + W<sub>B</sub> × G₁<sub>B</sub>) / (W<sub>A</sub> + W<sub>B</sub>)
              </p>
              <p className="text-center text-sm text-green-700">
                Solving for W<sub>B</sub>: W<sub>B</sub> = W<sub>A</sub> × (G₁ - G₁<sub>A</sub>) / (G₁<sub>B</sub> - G₁)
              </p>
            </div>
          </Card>

          {/* Input Form */}
          <Card customClassName="mb-8">
            <h2 className="text-2xl font-medium mb-6 frutiger-metallic-text">Input Parameters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 frutiger-metallic-text">
                    Material A Weight (W<sub>A</sub>) - Known
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={materialAWeight || ""}
                    onChange={(e) => setMaterialAWeight(parseFloat(e.target.value) || 0)}
                    className="w-full p-3 rounded-md border border-green-300 bg-green-50/50 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., 100"
                  />
                  <p className="text-xs text-green-600 mt-1">Weight in tons, kg, or any unit</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 frutiger-metallic-text">
                    Material A Grade (G₁<sub>A</sub>) - Known
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={materialAGrade || ""}
                    onChange={(e) => setMaterialAGrade(parseFloat(e.target.value) || 0)}
                    className="w-full p-3 rounded-md border border-green-300 bg-green-50/50 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., 15.5"
                  />
                  <p className="text-xs text-green-600 mt-1">Grade as percentage (%)</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 frutiger-metallic-text">
                    Material B Grade (G₁<sub>B</sub>) - Known
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={materialBGrade || ""}
                    onChange={(e) => setMaterialBGrade(parseFloat(e.target.value) || 0)}
                    className="w-full p-3 rounded-md border border-green-300 bg-green-50/50 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., 25.0"
                  />
                  <p className="text-xs text-green-600 mt-1">Grade as percentage (%)</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 frutiger-metallic-text">
                    Desired Blended Grade (G₁) - Target
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={desiredBlendedGrade || ""}
                    onChange={(e) => setDesiredBlendedGrade(parseFloat(e.target.value) || 0)}
                    className="w-full p-3 rounded-md border border-green-300 bg-green-50/50 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., 20.0"
                  />
                  <p className="text-xs text-green-600 mt-1">Target grade as percentage (%)</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={calculateBlending}
                className="flex-1 p-3 bg-green-300 hover:bg-green-400 dark:bg-green-700 dark:hover:bg-green-600 transition-all rounded-lg font-medium"
              >
                Calculate Material B Weight
              </button>
              <button
                onClick={clearCalculation}
                className="px-6 p-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all rounded-lg"
              >
                Clear
              </button>
            </div>
          </Card>

          {/* Error Display */}
          {error && (
            <Card customClassName="mb-8 border-red-300 bg-red-50/50">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </Card>
          )}

          {/* Results */}
          {result && (
            <Card customClassName="mb-8">
              <h2 className="text-2xl font-medium mb-6 frutiger-metallic-text">Calculation Results</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-100/60 rounded-lg">
                    <h3 className="font-medium text-lg frutiger-metallic-text">Material B Weight Required</h3>
                    <p className="text-2xl font-bold text-green-700">
                      {result.materialBWeight.toFixed(2)} units
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-100/60 rounded-lg">
                    <h3 className="font-medium frutiger-metallic-text">Total Blended Weight</h3>
                    <p className="text-lg font-semibold text-green-700">
                      {result.totalWeight.toFixed(2)} units
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-green-100/60 rounded-lg">
                    <h3 className="font-medium frutiger-metallic-text">Material Proportions</h3>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between">
                        <span>Material A:</span>
                        <span className="font-semibold">{result.percentageA.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material B:</span>
                        <span className="font-semibold">{result.percentageB.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  {verifiedGrade && (
                    <div className="p-4 bg-blue-100/60 rounded-lg">
                      <h3 className="font-medium frutiger-metallic-text">Verification</h3>
                      <p className="text-sm">Calculated blend grade:</p>
                      <p className="text-lg font-semibold text-blue-700">
                        {verifiedGrade.toFixed(3)}%
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        Target: {desiredBlendedGrade}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Detailed Breakdown */}
              <div className="mt-6 p-4 bg-gray-100/60 rounded-lg">
                <h3 className="font-medium mb-3 frutiger-metallic-text">Calculation Breakdown</h3>
                <div className="space-y-2 text-sm font-mono">
                  <p>W<sub>B</sub> = W<sub>A</sub> × (G₁ - G₁<sub>A</sub>) / (G₁<sub>B</sub> - G₁)</p>
                  <p>W<sub>B</sub> = {materialAWeight} × ({desiredBlendedGrade} - {materialAGrade}) / ({materialBGrade} - {desiredBlendedGrade})</p>
                  <p>W<sub>B</sub> = {materialAWeight} × {(desiredBlendedGrade - materialAGrade).toFixed(2)} / {(materialBGrade - desiredBlendedGrade).toFixed(2)}</p>
                  <p className="font-bold">W<sub>B</sub> = {result.materialBWeight.toFixed(2)} units</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
} 