
interface TitleProps {
    title: string;
}

export default function({ title }: TitleProps) {

    return(
        <>
            <h1 
                className='text-4xl sm:text-3xl leading-none font-bold text-gray-900 my-5'
            >
                {title}
            </h1>
        </>
    )
}