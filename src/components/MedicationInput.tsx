import { useState } from "react";
import { Plus, X, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Medication } from "@/types/medication";

// Common medications for auto-suggestion
const COMMON_MEDICATIONS = [
  "Aspirin", "Warfarin", "Lisinopril", "Metformin", "Atorvastatin",
  "Omeprazole", "Clopidogrel", "Potassium Chloride", "Metoprolol",
  "Amlodipine", "Losartan", "Simvastatin", "Levothyroxine",
  "Albuterol", "Gabapentin", "Sertraline", "Ibuprofen", "Acetaminophen"
];

interface MedicationInputProps {
  onAddMedication: (medication: Medication) => void;
  medications: Medication[];
  onRemoveMedication: (id: string) => void;
}

const MedicationInput = ({ onAddMedication, medications, onRemoveMedication }: MedicationInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    
    if (value.length > 0) {
      const filtered = COMMON_MEDICATIONS.filter(med => 
        med.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleAddMedication = (name: string) => {
    if (name.trim()) {
      const medication: Medication = {
        id: Date.now().toString(),
        name: name.trim(),
      };
      onAddMedication(medication);
      setInputValue("");
      setSuggestions([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddMedication(inputValue);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
        <Pill className="h-5 w-5 text-primary" />
        Your Medications
      </h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Enter medication name..."
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full"
            />
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleAddMedication(suggestion)}
                    className="w-full text-left px-4 py-2 hover:bg-accent text-foreground transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button type="submit" disabled={!inputValue.trim()}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </form>

      {medications.length === 0 ? (
        <div className="text-center py-8 text-muted">
          <Pill className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No medications added yet.</p>
          <p className="text-sm mt-1">Start by entering your first medication above.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {medications.map((med) => (
            <div
              key={med.id}
              className="flex items-center justify-between p-3 bg-accent/50 rounded-lg border border-border"
            >
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono text-xs">
                  {medications.indexOf(med) + 1}
                </Badge>
                <span className="font-medium text-foreground">{med.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveMedication(med.id)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {medications.length > 0 && medications.length < 2 && (
        <p className="text-sm text-muted mt-4">
          Add at least 2 medications to check for interactions.
        </p>
      )}
    </Card>
  );
};

export default MedicationInput;
