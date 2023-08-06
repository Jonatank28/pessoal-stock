'use client'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import { AuthProvider } from '@/context/auth'
import { DataInitialProvider } from '@/context/dataInitial'
import { usePathname } from 'next/navigation'
import useAuth from '@/hooks/useAuth'
import Toast from '@/components/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Stock',
}

const Root = () => {
    const { user, toast } = useAuth()
    return (
        <>
            {user && <Sidebar />}
            {/* {toast?.status && <Toast />} */}
            <Toast />
        </>
    )
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathName = usePathname()

    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <DataInitialProvider>
                        <ThemeProvider attribute="class">
                            <main
                                className={`
                ${pathName !== '/login' ? 'flex  w-screen h-screen' : ''}
              `}
                            >
                                {pathName !== '/login' && <Root />}
                                <div
                                    className={`
                  ${
                      pathName !== '/login'
                          ? 'flex-1 overflow-x-hidden pl-60'
                          : ''
                  }
                `}
                                >
                                    {children}
                                </div>
                            </main>
                        </ThemeProvider>
                    </DataInitialProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
