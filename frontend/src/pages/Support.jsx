import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HelpCircle, MessageCircle, Book, ExternalLink } from "lucide-react";

const faqs = [
  { question: "How do I create my first course?", answer: "Click 'New Course' on your dashboard and follow the setup wizard." },
  { question: "How do I add students manually?", answer: "Go to Students > Add Student and enter their email address." },
  { question: "Can I offer free courses?", answer: "Yes! In the pricing tab of your course, toggle 'Free Course' on." },
];

export default function Support() {
  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-8">Support</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-xl border border-border p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground">Chat with our support team in real-time</p>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Book className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Documentation</h3>
            <p className="text-sm text-muted-foreground">Browse our comprehensive guides</p>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">FAQ</h3>
            <p className="text-sm text-muted-foreground">Find answers to common questions</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Frequently Asked Questions</h3>
          </div>
          
          <div className="divide-y divide-border">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6">
                <h4 className="font-medium text-foreground mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-8 bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-6">Contact Us</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
              <input 
                type="text"
                placeholder="What can we help you with?"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <textarea 
                rows={4}
                placeholder="Describe your issue..."
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>
            
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
