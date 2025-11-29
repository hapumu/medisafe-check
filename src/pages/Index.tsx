import { Shield, Search, BookOpen, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">MediChecker</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
            <Button onClick={() => navigate("/checker")}>Check Interactions</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Check Drug Interactions <span className="text-primary">Safely</span>
          </h1>
          <p className="text-lg md:text-xl text-muted mb-8 max-w-2xl mx-auto">
            MediChecker helps patients and caregivers identify potential medication interactions 
            with clear, educational guidance. Take control of your medication safety today.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/checker")}
            className="text-lg px-8 py-6"
          >
            Start Checking Medications
            <Search className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">How MediChecker Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Enter Your Medications</h3>
              <p className="text-muted">
                Add all your prescription and over-the-counter medications by name. 
                Our auto-suggestion helps you find the right drug quickly.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <AlertTriangle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Identify Interactions</h3>
              <p className="text-muted">
                Our system analyzes your medications and identifies potential interactions 
                with color-coded severity indicators.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Learn & Take Action</h3>
              <p className="text-muted">
                Get easy-to-understand explanations and actionable recommendations 
                for safer medication management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-12 px-4 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <div className="border-l-4 border-primary pl-6 py-4">
            <h3 className="font-semibold mb-2 text-foreground">Important Medical Disclaimer</h3>
            <p className="text-sm text-muted">
              MediChecker is an educational tool designed to help you understand potential drug interactions. 
              This information does not replace professional medical advice. Always consult your healthcare 
              provider or pharmacist before making any changes to your medications.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border bg-card/50">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted">
            © 2025 MediChecker. For educational purposes only. Not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
