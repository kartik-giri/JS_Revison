export interface todoType {
     id: number
    title: string,
    completed: boolean,
    dueDate: string
}

export interface childrenProps {
    children : todoType[]
}