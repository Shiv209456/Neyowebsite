import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Ship, Truck, Shield, Clock, Users, ArrowRight, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-space-grotesk">GlobalTrade Solutions</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
            <Button variant="outline" asChild>
              <a href="/auth/login">Sign In</a>
            </Button>
            <Button asChild>
              <a href="/auth/signup">Join Marketplace</a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Trusted by 500+ Global Businesses
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6 leading-tight">
            Your Gateway to
            <span className="text-primary block">Global Trade Excellence</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with verified buyers and sellers worldwide. Access real-time tariff information, list your products,
            and discover new trading opportunities in our comprehensive B2B marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="/auth/signup">
                Join Marketplace Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
              <a href="#services">Explore Features</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">Comprehensive Trade Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              End-to-end services designed to simplify your international business operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Ship className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="font-space-grotesk">Import Services</CardTitle>
                <CardDescription>Complete import management from sourcing to delivery</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Customs clearance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Documentation handling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Quality inspection</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="font-space-grotesk">Export Services</CardTitle>
                <CardDescription>Expand your reach with our export expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Market research</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Export documentation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Shipping coordination</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="font-space-grotesk">Compliance & Legal</CardTitle>
                <CardDescription>Navigate regulations with confidence</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Regulatory compliance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Trade agreements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Risk management</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold font-space-grotesk text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Global Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-space-grotesk text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-space-grotesk text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-space-grotesk text-primary mb-2">99%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">Why Choose GlobalTrade Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the difference of working with industry leaders
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-bold font-space-grotesk mb-4">Fast Processing</h3>
              <p className="text-muted-foreground">
                Streamlined processes ensure quick turnaround times for all your trade operations
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-bold font-space-grotesk mb-4">Secure & Compliant</h3>
              <p className="text-muted-foreground">
                Full compliance with international trade regulations and secure handling of your cargo
              </p>
            </div>
            <div className="text-center">
              <Users className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-bold font-space-grotesk mb-4">Expert Support</h3>
              <p className="text-muted-foreground">
                Dedicated team of trade specialists available 24/7 to support your business needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6">Ready to Expand Your Global Reach?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of successful businesses who trust us with their international trade operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="/auth/signup">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
              <a href="#services">Explore Features</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-6 w-6 text-primary" />
                <span className="font-bold font-space-grotesk">GlobalTrade Solutions</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Your trusted partner in international trade, connecting businesses worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold font-space-grotesk mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Import Services</li>
                <li>Export Services</li>
                <li>Customs Clearance</li>
                <li>Logistics Management</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold font-space-grotesk mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>News</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold font-space-grotesk mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+1 (555) 123-4567</li>
                <li>info@globaltrade.com</li>
                <li>123 Trade Center, NY</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 GlobalTrade Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
