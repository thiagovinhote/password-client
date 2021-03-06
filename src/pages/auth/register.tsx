import { useState } from 'react'
import Link from 'next/link'
import { ReactComponent as LogoSvg } from '../../assets/images/padlock.svg'
import { SubmitHandler, useForm } from 'react-hook-form'
import { DefaultButton } from '~/presentation/atoms/DefaultButton'
import { InputForm } from '~/presentation/molecules/InputForm'
import { makeApiAuthRegister } from '~/main/factories/usecases'
import { useRouter } from 'next/router'
import {
  CompareValueValidation,
  EmailValueValidation
} from '~/presentation/validations'

type UserFormData = {
  email: string
  name: string
  password: string
  passwordConfirmation: string
}

const apiAuthRegister = makeApiAuthRegister()

const Register: React.FC = () => {
  const signUpForm = useForm<UserFormData>()
  const [signUpError, setSignUpError] = useState<string>()
  const router = useRouter()
  const { exec: emailValidation } = EmailValueValidation.factory()
  const { exec: compareValidation } = CompareValueValidation.factory()

  const handleSignUp: SubmitHandler<UserFormData> = async data => {
    setSignUpError(undefined)
    const registerResult = await apiAuthRegister.exec({
      name: data.name,
      email: data.email,
      password: data.password
    })

    if (registerResult.isRight()) {
      return router.replace({
        pathname: '/auth/login',
        query: { email: data.email }
      })
    }

    setSignUpError(registerResult.value.message)
  }

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <LogoSvg className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
        </div>

        {signUpError && (
          <div
            className="p-4 mb-4  bg-red-100 rounded-lg dark:bg-red-200"
            role="alert"
          >
            <span className="text-sm text-red-700 dark:text-red-800">
              {signUpError}
            </span>
          </div>
        )}

        <form
          className="mt-8 space-y-6"
          onSubmit={signUpForm.handleSubmit(handleSignUp)}
          noValidate
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md space-y-4">
            <InputForm
              formRegister={signUpForm.register('name', {
                required: 'Nome obrigat??rio'
              })}
              label="Seu nome"
              type="text"
              autoComplete="name"
              placeholder="Nome completo"
              error={signUpForm.formState.errors.name?.message}
            />
            <InputForm
              formRegister={signUpForm.register('email', {
                required: 'E-mail obrigat??rio',
                validate: {
                  email: value => emailValidation(value)?.message
                }
              })}
              label="Seu e-mail"
              type="email"
              autoComplete="email"
              placeholder="Endere??o de e-mail"
              error={signUpForm.formState.errors.email?.message}
            />
            <InputForm
              formRegister={signUpForm.register('password', {
                required: 'Senha obrigat??ria'
              })}
              label="Senha"
              type="password"
              autoComplete="current-password"
              placeholder="Criar senha para entrar na plataforma"
              error={signUpForm.formState.errors.password?.message}
            />
            <InputForm
              formRegister={signUpForm.register('passwordConfirmation', {
                required: 'Senha obrigat??ria',
                validate: {
                  compare: value =>
                    compareValidation({
                      left: value,
                      right: signUpForm.getValues().password
                    })?.message
                }
              })}
              label="Confirmar senha"
              type="password"
              autoComplete="current-password"
              placeholder="Repita a senha aqui"
              error={signUpForm.formState.errors.passwordConfirmation?.message}
            />
          </div>

          <div className="space-y-4">
            <div className="mt-6">
              <DefaultButton
                color="indigo"
                className="w-full font-medium"
                tag="button"
                attrs={{ type: 'submit' }}
              >
                Criar
              </DefaultButton>
            </div>
            <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
              <Link href="/auth/login" passHref>
                <a className="text-indigo-600 font-medium hover:text-indigo-500">
                  J?? possuo conta
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
