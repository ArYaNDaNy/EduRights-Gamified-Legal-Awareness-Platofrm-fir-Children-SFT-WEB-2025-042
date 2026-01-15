import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function ResetPassword() {
  const { token } = useParams(); // Grabs the token from URL
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Visibility Toggles
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      // 2. Call the Service
      await authService.resetPassword(token, password);
      
      setSuccess(true);
      
      // 3. Redirect after 2 seconds
      setTimeout(() => navigate('/login'), 2000);
      
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired token");
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
            {success ? (
              <CheckCircle className="w-8 h-8 text-white" />
            ) : (
              <Lock className="w-8 h-8 text-white" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-foreground">Reset Password</h1>
          <p className="text-muted-foreground mt-2">
            {success ? "All done! Redirecting you..." : "Enter your new secure password below."}
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm font-medium text-center">
              {error}
            </div>
          )}

          {success ? (
            <div className="text-center py-4">
              <p className="text-green-600 font-medium">Password updated successfully! 🎉</p>
              <Button 
                className="mt-4 w-full" 
                onClick={() => navigate('/login')}
              >
                Go to Login Now
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* New Password */}
              <div>
                <Label htmlFor="password">New Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirm">Confirm Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="confirm"
                    type={showConfirmPass ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Updating Password...' : 'Set New Password'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}