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
        <div className="flex w-full h-[200px] relative">
            {Array.from({length: qtd}, (_, i) => i + 1).map(i => (
                <img
                key={`${card.code_variant}_${i}`}
                className={`w-auto absolute w-full h-[200px] top-0 left-[${i*20}px]`}
                src={card.image} 
                alt={card.name}
                />
            ))}
            {qtd}
        </div>
    )
}