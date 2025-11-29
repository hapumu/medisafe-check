import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Interaction } from "@/types/medication";

interface InteractionResultsProps {
  interactions: Interaction[];
  hasChecked: boolean;
  medicationCount: number;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "major":
      return "bg-destructive/10 border-destructive text-destructive";
    case "moderate":
      return "bg-yellow-500/10 border-yellow-500 text-yellow-700 dark:text-yellow-400";
    case "minor":
      return "bg-primary/10 border-primary text-primary";
    default:
      return "bg-muted border-border text-foreground";
  }
};

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "major":
      return <AlertTriangle className="h-5 w-5 text-destructive" />;
    case "moderate":
      return <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
    case "minor":
      return <Info className="h-5 w-5 text-primary" />;
    default:
      return <Info className="h-5 w-5" />;
  }
};

const InteractionResults = ({ interactions, hasChecked, medicationCount }: InteractionResultsProps) => {
  if (!hasChecked) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Interaction Results</h2>
        <div className="text-center py-12 text-muted">
          <Info className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Add medications and click "Check for Interactions" to see results.</p>
        </div>
      </Card>
    );
  }

  if (interactions.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Interaction Results</h2>
        <Alert className="bg-primary/5 border-primary">
          <CheckCircle className="h-5 w-5 text-primary" />
          <AlertDescription className="text-foreground">
            <strong>Good news!</strong> No major interactions detected among your {medicationCount} medications.
            However, always consult your healthcare provider about your medication regimen.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground">
        Interaction Results
        <Badge variant="secondary" className="ml-2">
          {interactions.length} {interactions.length === 1 ? "interaction" : "interactions"} found
        </Badge>
      </h2>

      <div className="space-y-4">
        {interactions.map((interaction, index) => (
          <Card key={index} className={`p-4 border-2 ${getSeverityColor(interaction.severity)}`}>
            <div className="flex items-start gap-3 mb-3">
              {getSeverityIcon(interaction.severity)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    {interaction.drug1}
                  </Badge>
                  <span className="text-muted">+</span>
                  <Badge variant="outline" className="font-mono text-xs">
                    {interaction.drug2}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    className={
                      interaction.severity === "major" 
                        ? "bg-destructive text-destructive-foreground" 
                        : interaction.severity === "moderate"
                        ? "bg-yellow-600 text-white"
                        : "bg-primary text-primary-foreground"
                    }
                  >
                    {interaction.severity.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3 ml-8">
              <div>
                <h4 className="font-semibold text-sm mb-1">Description</h4>
                <p className="text-sm text-foreground">{interaction.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-1">How It Happens</h4>
                <p className="text-sm text-muted">{interaction.mechanism}</p>
              </div>

              <div className="pt-2 border-t border-border">
                <h4 className="font-semibold text-sm mb-1 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  What You Should Do
                </h4>
                <p className="text-sm text-foreground font-medium">{interaction.recommendation}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Alert className="mt-4 bg-muted/30">
        <Info className="h-5 w-5" />
        <AlertDescription className="text-sm text-foreground">
          <strong>Important:</strong> This information is for educational purposes only. 
          Always consult your healthcare provider or pharmacist before making any changes to your medications.
        </AlertDescription>
      </Alert>
    </Card>
  );
};

export default InteractionResults;
