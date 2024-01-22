import {findIndex, head, last} from "lodash";
import {useCallback} from "react";


export default function useLinkManage({ onLink, onUnlink, dataHolders, chunk }){
    const linkable = chunk.length > 1;
    const hasLink = head(chunk)?.dataSources?.length > 1;

    const getIndex = useCallback(
        (id) => {
            return findIndex(dataHolders, ["id", id]);
        },
        [dataHolders]
    );
    const onLinkClick = () => {
        const indexOfMergedHolder = getIndex(head(chunk)?.id);
        const indexOfDeletedHolder = getIndex(last(chunk)?.id);
        onLink(indexOfMergedHolder, indexOfDeletedHolder);
    };

    const onUnlinkClick = () => {
        onUnlink(head(chunk).id);
    };

    const onIconClick = () => {
        hasLink ? onUnlinkClick() : onLinkClick();
    };

    return {
        linkable,
        hasLink,
        onIconClick,
        onLinkClick,
        onUnlinkClick,
        getIndex
    }

}
