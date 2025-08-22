import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/modules/auth/context/AuthContext';
import LogoWhite from '@/assets/logo-white.svg';
import { Fa7SolidAngleDoubleRight } from '@/components/icons/Fa7SolidAngleDoubleRight';
import { FormRow } from '@/components/ui/Form/FormRow';
import { Input } from '@/components/primitives/Input';
import staffMilitary from '@/assets/military.png';
import { RectBlurCardCSS } from '../RectBlurCardCSS';
import styles from './LoginForm.module.css';

// Schema de validación
const loginSchema = z.object({
  email: z.email('Email inválido').min(1, 'El email es requerido'),
  password: z.string().min(1, 'La contraseña es requerida').min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      const from = (location.state as any)?.from?.pathname || '/app';
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegisterClick = () => {
    navigate('/auth/register');
  };

  return (
    <>
      {/* Sección Izquierda */}
      <div className="hidden lg:flex flex-col items-center gap-[40px] flex-1 self-stretch">
        <div className="flex flex-col justify-center items-center gap-[100px] flex-1 self-stretch">
          <div className="flex flex-col items-center gap-[4px]">
            <img src={LogoWhite} alt="Logo" className="w-full max-w-[505px] h-auto aspect-[505/187.06]" />
          </div>
        </div>
      </div>

     {/* Sección Derecha - Formulario */}
      <div className={`flex flex-col w-full max-w-[535px] ${styles.container}`}>
        {/* Card Principal */}
        <RectBlurCardCSS className="flex-1">
          <div className="relative w-full h-full p-4 md:p-[32px]">
            {/* Background con blur */}
            <div className="relative flex flex-col items-center w-full h-full rounded-[32px] bg-[rgba(10,15,13,0.70)] backdrop-blur-[4px]">
              {/* Imagen Militar */}
              <div className={styles.militaryContainer}>
                <img
                  src={staffMilitary}
                  alt="Staff Military"
                  className={styles.militaryImage}
                />
              </div>

              {/* Formulario */}
              <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="flex w-full p-6 xl:py-[48px] [@media(max-height:954px)]:py-[12px] flex-col items-center gap-6 md:gap-8 rounded-[32px] bg-cards relative z-[1]"
              >
                {/* Header */}
                <div className="flex w-full pb-4 md:pb-[32px] [@media(max-height:954px)]:pb-[6px] flex-col justify-center items-center gap-2 md:gap-[4px]">
                  <h1 className="text-primary-light font-valkocapela text-2xl md:text-[28px] font-normal">
                    Iniciar sesión
                  </h1>
                  <p className="text-secondary-light font-montserrat text-xs md:text-[14px] font-normal text-center">
                    ¡Introduce tu email y contraseña para iniciar sesión!
                  </p>
                </div>

                {/* Campos del formulario */}
                <div className="flex flex-col items-end gap-4 md:gap-[16px] pb-4 md:pb-[32px] w-full">
                  <FormRow label="Email" required error={errors.email?.message} className="w-full">
                    <Input
                      type="email"
                      placeholder="Ingresa tu email"
                      {...register('email')}
                      className="w-full"
                      disabled={isLoading}
                    />
                  </FormRow>

                  <FormRow label="Contraseña" required error={errors.password?.message} className="w-full">
                    <Input
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      {...register('password')}
                      canShowPassword={true}
                      className="w-full"
                      disabled={isLoading}
                    />
                  </FormRow>
                </div>

                {/* Link de registro */}
                <div className="flex justify-center w-full">
                  <button
                    type="button"
                    onClick={handleRegisterClick}
                    className="text-secondary-light hover:text-primary-light text-sm transition-colors"
                  >
                    ¿No tienes cuenta? Regístrate aquí
                  </button>
                </div>
              </form>
            </div>
          </div>
        </RectBlurCardCSS>

        {/* Botón de iniciar sesión */}
        <div className="flex pt-[24px] flex-col items-start gap-[10px] self-stretch">
          <button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
            className={`flex justify-center items-center gap-2 self-stretch rounded-[32px] bg-primary ${
              isLoading ? 'opacity-70' : 'cursor-pointer'
            } ${styles.button}`}
          >
            <span className="text-background text-center font-valkocapela text-base md:text-xl font-normal uppercase">
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </span>
            <Fa7SolidAngleDoubleRight fill="black" width={20} height={20} />
          </button>
        </div>
      </div>
    </>
  );
}
