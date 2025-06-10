import {useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/common/input';
import { Button } from '../components/common/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/card';
import {z,ZodError} from 'zod';


const signInSchema=z.object({
    email:z.string().email('Invalid email Address'),
    password:z.string().min(1,'Password is required')
})

export default function SignIn(){
    const [formData,setFormData]=useState({
        email:'',
        password:''
    })
    const [errors,setErrors]=useState({})
    const {signIn}=useAuth();
    const [isSubmitting,setIsSubmitting]=useState(false);
    const navigate=useNavigate()
    const handleSubmit=async (data) => {
        try{
            setErrors({});
            setIsSubmitting(true);
            const validatedData=signInSchema.parse(data);
            await signIn(validatedData.email,validatedData.password);
            navigate('/');
        }catch(error){
            if(error instanceof ZodError){
                const formattedErrors={};
                error.errors.forEach((err) => {
                    if(err.path){
                        formattedErrors[err.path[0]]=err.message;
                    }
                });
                setErrors(formattedErrors);
            }else{
                setErrors({submit:error.message});
            }
        }finally{
            setIsSubmitting(false);
        }   
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
          setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
      }
    
      return (
        <div className="flex min-h-screen items-center justify-center bg-purple-50/30 p-4">

          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Sign In</CardTitle>
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
                    placeholder="Enter your password"
                    className={errors.password ? 'border-red-500' : ''}
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
                {errors.submit && <p className="text-center text-sm text-red-500">{errors.submit}</p>}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
                <div className="text-center text-sm">
                  Don't have an account?{' '}
                  <a href="/signup" className="text-purple-600 hover:text-purple-500">
                    Sign up
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )
}