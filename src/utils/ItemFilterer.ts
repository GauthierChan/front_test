import {Item} from "../models/Items";

export interface ItemFilterer{
    filter(query: string, items: Item[]): Item[]
}

export class ItemNameFilterer implements ItemFilterer {

    /**
     * Return, for a given list of items and a query, the list of items containing the query in its title
     */
    filter(query: string, items: Item[]): Item[] {
        let filteredItems: Item[] = []

        // Lower case + remove accents to not have the user having to type the exact same word as the researched one.
        const sanitizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        items.forEach((item: Item) => {
            let sanitizedName = item.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            if(sanitizedName.includes(sanitizedQuery)){
                filteredItems.push(item)
            } else if(this.isStringContainingWords(sanitizedName, sanitizedQuery.split(' '))){
                filteredItems.push(item)
            }
        })

        return filteredItems
    }

    /**
     * Check for a given string arrays that all of its elements are contained in a given *string*
     * Example: *string* is "Chapeau rouge dorée", if words has [Chapeau, dor] this function will return true
     */
    private isStringContainingWords(string: string, words: string[]) {
        for (const word of words) {
            if (!string.includes(word)) return false;
        }
        // If we reach this point, that means all words were found, so the result is true.
        return true;
    }
}