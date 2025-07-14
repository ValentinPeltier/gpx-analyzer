"use client";

import { useRef } from "react";
import { toast } from "sonner";
import {
    Menubar as MenubarPrimitive,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from "@/components/ui/input";
import GpxFile from "@/utils/GpxFile";

export const Menubar = ({
    recentFiles: recentFileNames,
    onFileOpen,
    onFileClose,
}: {
    recentFiles: string[],
    onFileOpen: (file: GpxFile) => void,
    onFileClose: () => void,
}) => {
    const fileRef = useRef<HTMLInputElement>(null);

    return <>
        <Input
            type="file"
            multiple={true}
            accept="application/gpx+xml"
            className="hidden"
            ref={fileRef}
            onChange={async (e) => {
                const fileList = e.target.files;

                if (fileList !== null) {
                    // Open all files
                    for (const file of fileList) {
                        let gpxFile;
                        try {
                            gpxFile = GpxFile.parse(file.name, await file.text());
                        }
                        catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
                            toast(`Impossible d'ouvrir le fichier ${file.name}`, {
                                "className": "text-red-500",
                            });
                            continue;
                        }
                        onFileOpen(gpxFile);
                    }
                }
            }}
        />
        <MenubarPrimitive>
            <MenubarMenu>
                <MenubarTrigger>Fichier</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onSelect={() => fileRef.current?.click()}>Charger un fichier...</MenubarItem>

                    <MenubarSub>
                        <MenubarSubTrigger>Ouvrir un fichier récent</MenubarSubTrigger>
                        <MenubarSubContent>
                            {recentFileNames.map((recentFileName, index) => (
                                <MenubarItem key={index}>{recentFileName}</MenubarItem>
                            ))}
                        </MenubarSubContent>
                    </MenubarSub>

                    <MenubarSeparator />

                    <MenubarItem onSelect={() => onFileClose()}>Fermer le fichier</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </MenubarPrimitive>
    </>;
};