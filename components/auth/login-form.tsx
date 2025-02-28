"use client"
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoginSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CardWrapper from './card-wrapper';
import { useState } from 'react';
import { login } from '@/actions/login';
import { FormError } from './form-error';
import Link from 'next/link';

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        setLoading(true);
        login(data).then((res) => {
            if (res.error) {
                setError(res.error);
                setLoading(false);
            }
        });
    };

    return (
        <CardWrapper
            headerLabel="Welcome back"
            title="Login"
            backButtonHref="/"
            backButtonLabel="Back to home"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="johndoe@email.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                    </Button>
                    <div className="flex justify-between text-sm text-gray-500">
                        <Link href="/auth/forgot-password" className="hover:underline">
                            Forgot password?
                        </Link>
                        <br/>
                        <Link href="/auth/register" className="hover:underline">
                            Don&apos;t have an account?
                        </Link>
                    </div>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default LoginForm;