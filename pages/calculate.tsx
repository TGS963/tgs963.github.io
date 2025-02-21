import { useState, useEffect } from "react";

// Type definitions
type Excavator = {
  id: number;
  outputGrade: number;
  availableTrucks: number; // Out of 3 maximum
};

type Plant = {
  id: number;
  requiredGrade: number;
  allocations: {
    excavatorId: number;
    amount: number;
    trucksAssigned: number; // This will be 0-3 trucks
  }[];
};

const Calculator = () => {
  // State management
  const [excavators, setExcavators] = useState<Excavator[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [newExcavatorGrade, setNewExcavatorGrade] = useState<number>(0);
  const [newExcavatorTrucks, setNewExcavatorTrucks] = useState<number>(3); // Default to 3 trucks
  const [newPlantGrade, setNewPlantGrade] = useState<number>(0);

  // Add new excavator
  const handleAddExcavator = () => {
    if (newExcavatorGrade <= 0) {
      alert("Please enter a valid grade");
      return;
    }
    if (newExcavatorTrucks < 0 || newExcavatorTrucks > 3) {
      alert("Please enter a valid number of trucks (0-3)");
      return;
    }

    const newExcavator: Excavator = {
      id: excavators.length + 1,
      outputGrade: newExcavatorGrade,
      availableTrucks: newExcavatorTrucks,
    };

    setExcavators([...excavators, newExcavator]);
    setNewExcavatorGrade(0);
    setNewExcavatorTrucks(3); // Reset to default
  };

  // Add new plant
  const handleAddPlant = () => {
    if (newPlantGrade <= 0) {
      alert("Please enter a valid grade requirement");
      return;
    }

    const newPlant: Plant = {
      id: plants.length + 1,
      requiredGrade: newPlantGrade,
      allocations: [],
    };

    setPlants([...plants, newPlant]);
    setNewPlantGrade(0);
  };

  // Calculate optimal allocations
  const calculateAllocations = () => {
    const totalExcavatorCapacity = excavators.reduce(
      (sum, ex) => sum + (ex.outputGrade * ex.availableTrucks) / 3,
      0,
    );

    const updatedPlants = plants.map((plant) => {
      if (totalExcavatorCapacity < plant.requiredGrade) {
        return { ...plant, allocations: [] };
      }

      const allocations = excavators.map((excavator) => {
        // Calculate what portion of this plant's needs should be met by this excavator
        const proportion =
          (excavator.outputGrade * excavator.availableTrucks) /
          3 /
          totalExcavatorCapacity;
        const gradeAmount = proportion * plant.requiredGrade;

        // Calculate how many trucks this requires
        const trucksNeeded = Math.min(
          Math.round((gradeAmount / excavator.outputGrade) * 3),
          excavator.availableTrucks,
        );

        return {
          excavatorId: excavator.id,
          amount: gradeAmount,
          trucksAssigned: trucksNeeded,
        };
      });

      return { ...plant, allocations };
    });

    setPlants(updatedPlants);
  };

  const handleUpdateTrucks = (excavatorId: number, change: number) => {
    setExcavators((prevExcavators) =>
      prevExcavators.map((ex) => {
        if (ex.id === excavatorId) {
          const newTrucks = Math.min(
            Math.max(0, ex.availableTrucks + change),
            3,
          );
          return { ...ex, availableTrucks: newTrucks };
        }
        return ex;
      }),
    );
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Grade Allocation Calculator
      </h1>

      {/* Excavator Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Excavators</h2>

        <div className="flex flex-wrap gap-4 items-end mb-6">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Output Grade:
              <input
                type="number"
                value={newExcavatorGrade}
                onChange={(e) => setNewExcavatorGrade(Number(e.target.value))}
                placeholder="Enter output grade"
                min="0"
                className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Trucks (0-3):
              <input
                type="number"
                value={newExcavatorTrucks}
                onChange={(e) => setNewExcavatorTrucks(Number(e.target.value))}
                min="0"
                max="3"
                className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>

          <button
            onClick={handleAddExcavator}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Add Excavator
          </button>
        </div>

        <div className="space-y-3">
          {excavators.map((ex) => (
            <div key={ex.id} className="bg-gray-50 rounded-lg p-4">
              <div className="font-medium text-gray-800 mb-2">
                Excavator {ex.id}
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <span>Output Grade: {ex.outputGrade}</span>
                <div className="flex items-center gap-2">
                  <span>Trucks:</span>
                  <button
                    onClick={() => handleUpdateTrucks(ex.id, -1)}
                    disabled={ex.availableTrucks <= 0}
                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">
                    {ex.availableTrucks}/3
                  </span>
                  <button
                    onClick={() => handleUpdateTrucks(ex.id, 1)}
                    disabled={ex.availableTrucks >= 3}
                    className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                <span>
                  Capacity: {((ex.availableTrucks / 3) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plant Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Plants</h2>

        <div className="flex flex-wrap gap-4 items-end mb-6">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Required Grade:
              <input
                type="number"
                value={newPlantGrade}
                onChange={(e) => setNewPlantGrade(Number(e.target.value))}
                placeholder="Enter required grade"
                min="0"
                className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>

          <button
            onClick={handleAddPlant}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Add Plant
          </button>
        </div>

        <div className="space-y-3">
          {plants.map((plant) => (
            <div key={plant.id} className="bg-gray-50 rounded-lg p-4">
              <div className="font-medium text-gray-800 mb-2">
                Plant {plant.id} - Required Grade: {plant.requiredGrade}
              </div>
              {plant.allocations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Resource Allocation:
                  </h4>
                  <div className="space-y-2">
                    {plant.allocations.map((allocation) => (
                      <div
                        key={allocation.excavatorId}
                        className="text-sm text-gray-600 flex flex-col gap-1"
                      >
                        <div className="font-medium">
                          Excavator {allocation.excavatorId}:
                        </div>
                        <div className="pl-4">
                          <div>
                            Grade contribution: {allocation.amount.toFixed(2)}
                          </div>
                          <div className="flex items-center gap-2">
                            <span>Trucks assigned: </span>
                            <span className="font-semibold text-blue-600">
                              {allocation.trucksAssigned}
                              {allocation.trucksAssigned === 1
                                ? " truck"
                                : " trucks"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        onClick={calculateAllocations}
      >
        Calculate Optimal Allocations
      </button>
    </div>
  );
};

export default Calculator;
