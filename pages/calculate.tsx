import { useState } from "react";
import Layout from "./layout";
import { Card } from "@/components/card";
import Stars from "@/components/star";

interface Excavator {
  id: string;
  name: string;
  grade: number;
  trucks: number;
}

interface Plant {
  id: string;
  name: string;
  requiredGrade: number;
  capacity: number;
}

interface TruckAllocation {
  excavatorId: string;
  plantId: string;
  truckCount: number;
}

export default function Calculate() {
  const [excavators, setExcavators] = useState<Excavator[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [allocations, setAllocations] = useState<TruckAllocation[]>([]);
  
  // Form states
  const [excavatorName, setExcavatorName] = useState("");
  const [excavatorGrade, setExcavatorGrade] = useState<number>(0);
  const [excavatorTrucks, setExcavatorTrucks] = useState<number>(3);
  
  const [plantName, setPlantName] = useState("");
  const [plantGrade, setPlantGrade] = useState<number>(0);
  const [plantCapacity, setPlantCapacity] = useState<number>(5);

  // Add new excavator to the list
  const addExcavator = () => {
    if (excavatorName) {
      const newExcavator: Excavator = {
        id: `e-${Date.now()}`,
        name: excavatorName,
        grade: excavatorGrade,
        trucks: excavatorTrucks
      };
      setExcavators([...excavators, newExcavator]);
      // Reset form
      setExcavatorName("");
      setExcavatorGrade(0);
      setExcavatorTrucks(3);
    }
  };

  // Add new plant to the list
  const addPlant = () => {
    if (plantName) {
      const newPlant: Plant = {
        id: `p-${Date.now()}`,
        name: plantName,
        requiredGrade: plantGrade,
        capacity: plantCapacity
      };
      setPlants([...plants, newPlant]);
      // Reset form
      setPlantName("");
      setPlantGrade(0);
      setPlantCapacity(5);
    }
  };

  // Remove excavator
  const removeExcavator = (id: string) => {
    setExcavators(excavators.filter(e => e.id !== id));
    setAllocations(allocations.filter(a => a.excavatorId !== id));
  };

  // Remove plant
  const removePlant = (id: string) => {
    setPlants(plants.filter(p => p.id !== id));
    setAllocations(allocations.filter(a => a.plantId !== id));
  };

  // Calculate optimal truck allocation based on grade matching
  const calculateAllocation = () => {
    // Simple allocation algorithm (can be enhanced for more complex logic)
    const newAllocations: TruckAllocation[] = [];
    
    // Sort plants by required grade (higher grade requirements first)
    const sortedPlants = [...plants].sort((a, b) => b.requiredGrade - a.requiredGrade);
    
    // Create a copy of excavators to track available trucks
    const availableExcavators = excavators.map(e => ({
      ...e,
      availableTrucks: e.trucks
    }));
    
    // For each plant, find suitable excavators
    sortedPlants.forEach(plant => {
      let remainingCapacity = plant.capacity;
      
      // Sort excavators by how close their grade is to the plant's required grade
      // Prioritize excavators with grade >= required grade
      const suitableExcavators = availableExcavators
        .filter(e => e.availableTrucks > 0)
        .sort((a, b) => {
          // If both meet or both don't meet the requirement, sort by closest match
          const aMeetsReq = a.grade >= plant.requiredGrade;
          const bMeetsReq = b.grade >= plant.requiredGrade;
          
          if (aMeetsReq === bMeetsReq) {
            return Math.abs(plant.requiredGrade - a.grade) - Math.abs(plant.requiredGrade - b.grade);
          }
          // Prioritize excavators that meet requirements
          return aMeetsReq ? -1 : 1;
        });
      
      // Allocate trucks from suitable excavators until plant capacity is fulfilled
      for (const excavator of suitableExcavators) {
        if (remainingCapacity <= 0) break;
        
        const trucksToAllocate = Math.min(excavator.availableTrucks, remainingCapacity);
        if (trucksToAllocate > 0) {
          newAllocations.push({
            excavatorId: excavator.id,
            plantId: plant.id,
            truckCount: trucksToAllocate
          });
          
          excavator.availableTrucks -= trucksToAllocate;
          remainingCapacity -= trucksToAllocate;
        }
      }
    });
    
    setAllocations(newAllocations);
  };
  
  // Find excavator/plant by ID
  const findExcavator = (id: string) => excavators.find(e => e.id === id);
  const findPlant = (id: string) => plants.find(p => p.id === id);

  return (
    <Layout>
      <Stars />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-3xl font-bold mb-8 text-center frutiger-metallic-text">Mining Resource Allocator</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Excavator Form */}
          <Card>
            <h2 className="text-2xl font-medium mb-4 frutiger-metallic-text">Add Excavator</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 frutiger-metallic-text">Name</label>
                <input
                  type="text"
                  value={excavatorName}
                  onChange={(e) => setExcavatorName(e.target.value)}
                  className="w-full p-2 rounded-md border border-green-300 bg-green-50/50 focus:ring-green-500 focus:border-green-500"
                  placeholder="Excavator name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 frutiger-metallic-text">Material Grade (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={excavatorGrade}
                  onChange={(e) => setExcavatorGrade(parseFloat(e.target.value))}
                  className="w-full p-2 rounded-md border border-green-300 bg-green-50/50 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 frutiger-metallic-text">Number of Trucks</label>
                <input
                  type="number"
                  min="1"
                  value={excavatorTrucks}
                  onChange={(e) => setExcavatorTrucks(parseInt(e.target.value))}
                  className="w-full p-2 rounded-md border border-green-300 bg-green-50/50 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <button
                onClick={addExcavator}
                className="w-full p-2 bg-green-200 hover:bg-green-300 transition-all dark:bg-green-900/50 rounded-lg"
              >
                Add Excavator
              </button>
            </div>
          </Card>
          
          {/* Plant Form */}
          <Card>
            <h2 className="text-2xl font-medium mb-4 frutiger-metallic-text">Add Plant</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 frutiger-metallic-text">Name</label>
                <input
                  type="text"
                  value={plantName}
                  onChange={(e) => setPlantName(e.target.value)}
                  className="w-full p-2 rounded-md border border-green-300 bg-green-50/50 focus:ring-green-500 focus:border-green-500"
                  placeholder="Plant name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 frutiger-metallic-text">Required Grade (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={plantGrade}
                  onChange={(e) => setPlantGrade(parseFloat(e.target.value))}
                  className="w-full p-2 rounded-md border border-green-300 bg-green-50/50 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 frutiger-metallic-text">Capacity (trucks)</label>
                <input
                  type="number"
                  min="1"
                  value={plantCapacity}
                  onChange={(e) => setPlantCapacity(parseInt(e.target.value))}
                  className="w-full p-2 rounded-md border border-green-300 bg-green-50/50 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <button
                onClick={addPlant}
                className="w-full p-2 bg-green-200 hover:bg-green-300 transition-all dark:bg-green-900/50 rounded-lg"
              >
                Add Plant
              </button>
            </div>
          </Card>
        </div>
        
        {/* Listings Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Excavators List */}
          <Card>
            <h2 className="text-2xl font-medium mb-4 frutiger-metallic-text">Excavators</h2>
            {excavators.length === 0 ? (
              <p className="text-sm text-green-600/80">No excavators added yet</p>
            ) : (
              <div className="space-y-3">
                {excavators.map((excavator) => (
                  <div key={excavator.id} className="p-3 bg-green-100/60 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">{excavator.name}</p>
                      <p className="text-sm">Grade: {excavator.grade}%</p>
                      <p className="text-sm">Trucks: {excavator.trucks}</p>
                    </div>
                    <button
                      onClick={() => removeExcavator(excavator.id)}
                      className="p-1 hover:bg-green-200 rounded-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
          
          {/* Plants List */}
          <Card>
            <h2 className="text-2xl font-medium mb-4 frutiger-metallic-text">Plants</h2>
            {plants.length === 0 ? (
              <p className="text-sm text-green-600/80">No plants added yet</p>
            ) : (
              <div className="space-y-3">
                {plants.map((plant) => (
                  <div key={plant.id} className="p-3 bg-green-100/60 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">{plant.name}</p>
                      <p className="text-sm">Required Grade: {plant.requiredGrade}%</p>
                      <p className="text-sm">Capacity: {plant.capacity} trucks</p>
                    </div>
                    <button
                      onClick={() => removePlant(plant.id)}
                      className="p-1 hover:bg-green-200 rounded-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
        
        {/* Calculate Button */}
        <div className="text-center mb-8">
          <button
            onClick={calculateAllocation}
            disabled={excavators.length === 0 || plants.length === 0}
            className={`px-8 py-3 rounded-lg text-lg font-medium transition-all ${
              excavators.length === 0 || plants.length === 0
                ? 'bg-green-200/50 cursor-not-allowed'
                : 'bg-green-300 hover:bg-green-400 dark:bg-green-700 dark:hover:bg-green-600'
            }`}
          >
            Calculate Optimal Allocation
          </button>
        </div>
        
        {/* Results Section */}
        {allocations.length > 0 && (
          <Card customClassName="mb-8">
            <h2 className="text-2xl font-medium mb-6 text-center frutiger-metallic-text">Truck Allocation Results</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-green-300">
                    <th className="text-left p-2">Excavator</th>
                    <th className="text-left p-2">Material Grade</th>
                    <th className="text-left p-2">Plant</th>
                    <th className="text-left p-2">Required Grade</th>
                    <th className="text-center p-2">Trucks Allocated</th>
                  </tr>
                </thead>
                <tbody>
                  {allocations.map((allocation, index) => {
                    const excavator = findExcavator(allocation.excavatorId);
                    const plant = findPlant(allocation.plantId);
                    
                    if (!excavator || !plant) return null;
                    
                    const gradeMatch = excavator.grade >= plant.requiredGrade;
                    
                    return (
                      <tr key={index} className="border-b border-green-200 hover:bg-green-100/30">
                        <td className="p-2">{excavator.name}</td>
                        <td className="p-2">{excavator.grade}%</td>
                        <td className="p-2">{plant.name}</td>
                        <td className="p-2">{plant.requiredGrade}%</td>
                        <td className="p-2 text-center relative">
                          <span className={`inline-flex items-center justify-center rounded-full py-1 px-4 
                            ${gradeMatch 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'}`}>
                            {allocation.truckCount}
                            {!gradeMatch && (
                              <span className="ml-1 text-xs" title="Grade requirement not met">⚠️</span>
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Summary */}
            <div className="mt-6 p-4 bg-green-100/40 rounded-lg">
              <h3 className="font-medium mb-2 frutiger-metallic-text">Summary</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {plants.map(plant => {
                  const plantAllocations = allocations.filter(a => a.plantId === plant.id);
                  const totalTrucks = plantAllocations.reduce((sum, a) => sum + a.truckCount, 0);
                  const isSatisfied = totalTrucks >= plant.capacity;
                  
                  const subOptimalCount = plantAllocations.filter(a => {
                    const excavator = findExcavator(a.excavatorId);
                    return excavator && excavator.grade < plant.requiredGrade;
                  }).reduce((sum, a) => sum + a.truckCount, 0);
                  
                  return (
                    <li key={plant.id}>
                      <span className="font-medium">{plant.name}:</span> {totalTrucks}/{plant.capacity} trucks allocated
                      {!isSatisfied && <span className="text-red-500 ml-1">(under capacity)</span>}
                      {subOptimalCount > 0 && <span className="text-yellow-600 ml-1">({subOptimalCount} below grade requirement)</span>}
                    </li>
                  );
                })}
                
                {excavators.map(excavator => {
                  const usedTrucks = allocations
                    .filter(a => a.excavatorId === excavator.id)
                    .reduce((sum, a) => sum + a.truckCount, 0);
                  const unusedTrucks = excavator.trucks - usedTrucks;
                  
                  return unusedTrucks > 0 ? (
                    <li key={excavator.id} className="text-yellow-600">
                      <span className="font-medium">{excavator.name}:</span> {unusedTrucks} trucks unused
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}