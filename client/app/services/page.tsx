'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: string;
}

export default function Services() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:4500/demo/services');
                const data = await response.json();

                if (data.success) {
                    setServices(data.data);
                } else {
                    setError('Failed to load services');
                }
            } catch (err) {
                setError('Failed to connect to server');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Navigation */}
            <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                            AcmeCorp
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <Link href="/" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                                Home
                            </Link>
                            <Link href="/services" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                                Services
                            </Link>
                        </div>
                        <Button variant="default" className="hidden md:block">
                            Get Started
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </div>

                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                            We offer comprehensive technology solutions tailored to meet your unique needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="container mx-auto px-4 py-20">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        <span className="ml-2 text-slate-600 dark:text-slate-300">Loading services...</span>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-600 dark:text-red-400">{error}</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <Card key={service.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <CardTitle>{service.name}</CardTitle>
                                    <CardDescription>
                                        {service.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Price:</span>
                                            <span className="text-lg font-bold text-slate-900 dark:text-white">
                                                ${service.price.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Duration:</span>
                                            <span className="text-sm text-slate-900 dark:text-white">
                                                {service.duration}
                                            </span>
                                        </div>
                                        <Button className="w-full mt-4" variant="outline">
                                            Get Quote
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20">
                <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <CardContent className="p-12 text-center">
                        <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
                        <p className="text-xl mb-8 opacity-90">
                            Let's discuss your requirements and create something amazing together.
                        </p>
                        <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                            Get a Quote
                        </Button>
                    </CardContent>
                </Card>
            </section>

            {/* Footer */}
            <footer className="border-t bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">AcmeCorp</h4>
                            <p className="text-slate-600 dark:text-slate-300">
                                Building the future, one project at a time.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h5>
                            <div className="space-y-2">
                                <Link href="/services" className="block text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                                    Services
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h5 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h5>
                            <div className="space-y-2">
                                <Link href="/" className="block text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                                    Home
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h5 className="font-semibold text-slate-900 dark:text-white mb-4">Support</h5>
                            <div className="space-y-2">
                                <Link href="/help" className="block text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                                    Help Center
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="border-t mt-8 pt-8 text-center text-slate-600 dark:text-slate-300">
                        <p>&copy; 2024 AcmeCorp. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
