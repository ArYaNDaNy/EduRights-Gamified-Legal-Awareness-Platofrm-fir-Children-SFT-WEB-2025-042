import { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService'; // Use the service!
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound, ArrowLeft, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("1. Button Clicked! Email is:", email); // <--- CHECK 1

    setMessage('');
    setError('');
    setLoading(true);

    try {
      console.log("2. Calling AuthService..."); 
      
      // IF CODE DIES HERE, your authService.js is missing the function
      await authService.forgotPassword(email); 
      
      console.log("3. Success! Backend responded.");
      setMessage("Check your email!");

    } catch (err) {
      console.error("CRASH REPORT:", err); // <--- This will show the real error
      
      // If 'err.response' is missing, it means it's a Frontend Code Error
      if (!err.response) {
        setError("Frontend Error: " + err.message);
      } else {
        setError(err.response.data.message || "Backend rejected request");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Logo/Icon */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Forgot Password?</h1>
          <p className="text-muted-foreground mt-2">
            No worries! Enter your email and we'll send you a reset link.
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          
          {/* Success Message */}
          {message && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 text-green-600 rounded-lg text-sm font-medium text-center">
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative mt-1.5">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Sending Link...' : 'Send Reset Link'}
            </Button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}