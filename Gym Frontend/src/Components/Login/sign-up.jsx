import { useState } from "react";
import { Button } from "./components/button.jsx";
import { Input } from './components/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from './components/card.jsx'
import { useAuth } from "./hooks/use-auth";
import { z, ZodError } from 'zod';
import { useNavigate } from "react-router-dom";


const signUpSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    name: z.string().optional(),
});

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const {signUp} = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (data) => {
        try {
            setErrors({});
            setIsSubmitting(true);
            const validatedData = signUpSchema.parse(data);
            await signUp(validatedData.email, validatedData.password, validatedData.name);
            navigate('/');
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors = {};
                error.errors.forEach((err) => {
                    if (err.path) {
                        formattedErrors[err.path[0]] = err.message
                    }
                })
                setErrors(formattedErrors)
            } else {
                setErrors({ submit: error.message });
            }
        } finally {
            setIsSubmitting(false);
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-purple-50/30 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit(formData)
                        }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                className={errors.email ? 'border-red-500' : ''}
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Create a password"
                                className={errors.password ? 'border-red-500' : ''}
                            />
                            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Name (optional)
                            </label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>
                        {errors.submit && <p className="text-center text-sm text-red-500">{errors.submit}</p>}
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}