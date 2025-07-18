"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { FileView } from "@/components/file-view";
import File from "@/utils/gpx/File";

export const FileTabs = ({
    files,
    fileName,
    onFileChange,
    onFileClose,
}: {
    files: File[],
    fileName: string | undefined,
    onFileChange: (fileId: string) => void,
    onFileClose: (fileId: string) => void,
}) => {
    return (
        <Tabs value={fileName ?? ""} onValueChange={onFileChange}>
            <TabsList className="w-full justify-start">
                {files.map((file, index) => (
                    <ContextMenu key={index}>
                        <ContextMenuTrigger>
                            <TabsTrigger
                                key={index}
                                value={file.name}
                                className="flex-0 w-[150] justify-start overflow-hidden text-ellipsis"
                            >{file.nameWithoutExtension}</TabsTrigger>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                            <ContextMenuItem variant="destructive" onClick={() => onFileClose(file.name)}>Fermer</ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                ))}
            </TabsList>
            {files.map((file, index) => (
                <TabsContent key={index} value={file.name}>
                    <FileView file={file} />
                </TabsContent>
            ))}
        </Tabs>
    );
};