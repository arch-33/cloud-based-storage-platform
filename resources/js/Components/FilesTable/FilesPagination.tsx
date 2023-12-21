import { router } from "@inertiajs/react";
import { Pagination } from "@nextui-org/react";
import { useState } from "react";

type PropsType = {
    pagination_meta: {
        [name: string]: any,
        links: any[]
    }
}
export default function FilesPagination({ pagination_meta }: PropsType) {
    const [currentPage, setCurrentPage] = useState(1);

    const onPaginate = (page: number) => {
        setCurrentPage(page)
        router.visit("/my-drive/?page=" + page);
    }
    return (
        <div className="flex flex-wrap items-center gap-4">
            {pagination_meta.links.length > 3 ?
                <Pagination
                    total={pagination_meta.total}
                    initialPage={pagination_meta.current_page}
                    variant="faded"
                    size="lg"
                    showShadow
                    showControls
                    page={pagination_meta.current_page}
                    onChange={onPaginate}
                    classNames={{
                        base: "w-full flex justify-center"
                    }}
                    
                // renderItem={renderItem}
                /> : <></>
            }

        </div>
    )
}