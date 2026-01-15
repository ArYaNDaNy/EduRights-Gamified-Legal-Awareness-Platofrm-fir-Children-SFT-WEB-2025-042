import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, UserCog, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [selectedRole, setSelectedRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const backendRole = selectedRole === 'student' ? 'KID' : 'ADMIN';
      

      await signup(name, email, password, backendRole);
    
      if (backendRole === 'ADMIN') {
        navigate('/');
      } else {
        navigate('/achievements'); // or /map for the kid
      }
      
    } catch (err) {
     
      const errorMessage = err.response?.data?.message || 'Failed to create account. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-2">Join us and start learning today</p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          {/* Role Selection */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">I am a</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={cn(
                  'flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all',
                  selectedRole === 'student'
                    ? 'border-primary bg-primary/10 shadow-md'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <GraduationCap className={cn(
                  'w-8 h-8',
                  selectedRole === 'student' ? 'text-primary' : 'text-muted-foreground'
                )} />
                <span className={cn(
                  'font-medium',
                  selectedRole === 'student' ? 'text-primary' : 'text-foreground'
                )}>
                  Student
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={cn(
                  'flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all',
                  selectedRole === 'admin'
                    ? 'border-primary bg-primary/10 shadow-md'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <UserCog className={cn(
                  'w-8 h-8',
                  selectedRole === 'admin' ? 'text-primary' : 'text-muted-foreground'
                )} />
                <span className={cn(
                  'font-medium',
                  selectedRole === 'admin' ? 'text-primary' : 'text-foreground'
                )}>
                  Teacher/Admin
                </span>
              </button>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1.5"
              />
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                {error}
              </div>
            )}

            <div className="text-sm">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" required className="mt-1 rounded" />
                <span className="text-muted-foreground">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
