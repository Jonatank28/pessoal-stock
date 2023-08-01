'use client'
import Button from '@/components/Form/Button'
import Input from '@/components/Form/Input'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '@/hooks/useAuth'

const page = () => {
    const { login, errorLogin } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    //? Envia os dados para a api
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        login(data)
    }

    return (
        <main className="w-screen h-screen flex bg-primary">
            <div className=" w-full">{/* <h1>esquerdxa</h1> */}</div>
            <div className=" w-full flex justify-center items-center">
                <div className=" p-10 bg-secondary rounded-lg">
                    <h1 className="text-xl">Faça login</h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="pt-6 flex flex-col gap-4 w-[300px]"
                    >
                        <Input
                            register={register}
                            label="Email"
                            errors={errors}
                            name="email"
                            type="email"
                            required={true}
                        />
                        <Input
                            register={register}
                            label="Password"
                            errors={errors}
                            name="password"
                            type="password"
                            minLength={4}
                            required={true}
                        />
                        {errorLogin && (
                            <p className="text-sm text-red-500">
                                Email ou senha incorretos
                            </p>
                        )}
                        <div className="pt-4">
                            <Button
                                title="Enviar"
                                type="submit"
                                className="primary w-full"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default page
