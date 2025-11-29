import { useState } from "react";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import MedicationInput from "@/components/MedicationInput";
import InteractionResults from "@/components/InteractionResults";
import type { Medication, Interaction } from "@/types/medication";

const Checker = () => {
  const navigate = useNavigate();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [hasChecked, setHasChecked] = useState(false);

  const handleCheckInteractions = () => {
    // Mock interaction checking logic
    const mockInteractions: Interaction[] = [];
    
    // Check all pairs of medications
    for (let i = 0; i < medications.length; i++) {
      for (let j = i + 1; j < medications.length; j++) {
        const drug1 = medications[i];
        const drug2 = medications[j];
        
        // Example interaction patterns (in real app, this would query a database)
        if (
          (drug1.name.toLowerCase().includes("warfarin") && drug2.name.toLowerCase().includes("aspirin")) ||
          (drug1.name.toLowerCase().includes("aspirin") && drug2.name.toLowerCase().includes("warfarin"))
        ) {
          mockInteractions.push({
            drug1: drug1.name,
            drug2: drug2.name,
            severity: "major",
            description: "Combined use increases bleeding risk significantly.",
            mechanism: "Both medications affect blood clotting through different mechanisms, creating additive anticoagulant effects.",
            recommendation: "Avoid combination if possible. If necessary, requires close monitoring by healthcare provider with regular blood tests.",
          });
        } else if (
          (drug1.name.toLowerCase().includes("lisinopril") && drug2.name.toLowerCase().includes("potassium")) ||
          (drug1.name.toLowerCase().includes("potassium") && drug2.name.toLowerCase().includes("lisinopril"))
        ) {
          mockInteractions.push({
            drug1: drug1.name,
            drug2: drug2.name,
            severity: "moderate",
            description: "May increase potassium levels in blood (hyperkalemia).",
            mechanism: "ACE inhibitors like lisinopril reduce potassium excretion, and supplementation adds to total potassium load.",
            recommendation: "Monitor potassium levels regularly. Consult healthcare provider about appropriate potassium intake.",
          });
        } else if (
          (drug1.name.toLowerCase().includes("omeprazole") && drug2.name.toLowerCase().includes("clopidogrel")) ||
          (drug1.name.toLowerCase().includes("clopidogrel") && drug2.name.toLowerCase().includes("omeprazole"))
        ) {
          mockInteractions.push({
            drug1: drug1.name,
            drug2: drug2.name,
            severity: "moderate",
            description: "Omeprazole may reduce the effectiveness of clopidogrel.",
            mechanism: "Omeprazole inhibits CYP2C19 enzyme needed to activate clopidogrel, reducing its anti-clotting effect.",
            recommendation: "Consider alternative acid reducer or take medications at different times. Discuss with healthcare provider.",
          });
        }
      }
    }
    
    setInteractions(mockInteractions);
    setHasChecked(true);
  };

  const handleAddMedication = (medication: Medication) => {
    setMedications([...medications, medication]);
    setHasChecked(false);
  };

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
    setHasChecked(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">MediChecker</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Drug Interaction Checker</h1>
          <p className="text-muted">
            Add your medications below to check for potential interactions. Include both prescription and over-the-counter drugs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div>
            <MedicationInput 
              onAddMedication={handleAddMedication}
              medications={medications}
              onRemoveMedication={handleRemoveMedication}
            />
            
            {medications.length >= 2 && (
              <Button 
                onClick={handleCheckInteractions}
                size="lg"
                className="w-full mt-6"
              >
                Check for Interactions
              </Button>
            )}
          </div>

          {/* Right Column - Results */}
          <div>
            <InteractionResults 
              interactions={interactions}
              hasChecked={hasChecked}
              medicationCount={medications.length}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checker;
