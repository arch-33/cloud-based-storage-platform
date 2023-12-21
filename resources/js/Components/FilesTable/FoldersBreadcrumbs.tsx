import { HomeIcon } from "@heroicons/react/24/outline"
import { Link } from "@inertiajs/react"
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import { useEffect } from "react"

type PropsType = {
    ancenstors: Object,
    homeUrl: string
}

export default function FoldersBreadcrumbs({ ancenstors, homeUrl }: PropsType) {
    useEffect(() => {
        // console.log(ancenstors);

    }, [])
    return (
        <Breadcrumbs
            separator="/"
            maxItems={3}
            size="lg"
            itemsBeforeCollapse={1}
            itemsAfterCollapse={2}
            itemClasses={{ item: "text-2xl px-4", separator: "px-4 text-2xl", }}
        >
            <BreadcrumbItem>
                <Link href={homeUrl} className="flex items-center gap-2 whitespace-nowrap">
                    <HomeIcon className="w-6 h-6" /> Home
                </Link></BreadcrumbItem>
            {/* {breadcrumbs.map((ele, key) => <BreadcrumbItem key={'BreadcrumbItem-' + key}>
                <Link href={"/my-drive" + key}>{ele}</Link></BreadcrumbItem>
            )} */}


        </Breadcrumbs>
    )
}