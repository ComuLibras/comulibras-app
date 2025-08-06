import { Button } from "@/application/shared/components/ui/button"
import { useNavigate } from "react-router"

export const HomePage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-2">
      <Button className="w-full" size="lg" onClick={() => navigate('/auth/sign-in')}>
        Acessar minha conta
      </Button>

      <Button className="w-full" variant="ghost" size="lg" onClick={() => navigate('/app/categories')}>
        Continuar como visitante
      </Button>
    </div>
  )
}