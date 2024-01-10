import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../services/api'

import {
    DramaImage,
    FictionImage,
    HorrorImage,
    MysteryImage,
    RomanceImage,
    SatireImage
} from '../assets/images'
import { Category } from '../models'


const availableCategories: Record<string, Category> = {
    'fiction': { name: 'Fiction', image: FictionImage },
    'satire': { name: 'Satire', image: SatireImage },
    'mystery': { name: 'Mystery', image: MysteryImage },
    'drama': { name: 'Drama', image: DramaImage },
    'horror': { name: 'Horror', image: HorrorImage },
    'romance': { name: 'Romance', image: RomanceImage }
}

function useCategories() {
    const categories: Category[] = []
    const { data, isLoading } = useQuery({ queryKey: ['categories'], queryFn: getCategories })

    if (!isLoading) {
        data.forEach((category: string) => {
            if (availableCategories[category]) {
                categories.push(availableCategories[category])
            }
        })
    }

    return { categories, isLoading }
}

export default useCategories