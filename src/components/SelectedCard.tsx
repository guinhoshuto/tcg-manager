interface Cards {
    name: string
    image: string
    code: string
    code_variant: string
    description: string
  }

interface SelectedCardProps {
    card: Cards,
    qtd: number,
    // setQtd: (n: number) => void
}

export default function SelectedCard({ card, qtd }: SelectedCardProps){
    return (
        <div>
            <img
            className="w-auto h-[200px]"
            src={card.image} 
            alt={card.name}
            />
            {qtd}
        </div>
    )
}