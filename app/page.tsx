"use client";

import { useState } from "react";
import { Menubar } from "@/components/menubar";
import { FileTabs } from "@/components/file-tabs";
import GpxFile from "@/utils/GpxFile";

export default function Home() {
    const [files, setFiles] = useState<GpxFile[]>([
        new GpxFile("test1.gpx", ""),
        new GpxFile("test2.gpx", ""),
    ]);
    const recentFileNames = [
        "recent1.gpx",
    ];
    const [currentFileName, setCurrentFileName] = useState<string>(files[0].getName());

    const openFile = (file: GpxFile) => {
        // If the file is not already open
        if (files.findIndex((f) => f.getName() === file.getName()) === -1) {
            // Add the file
            setFiles(files.concat([file]));
        }

        // Switch to the new tab
        setCurrentFileName(file.getName());
    };

    const closeFile = (fileName: string) => {
        if (fileName !== undefined) {
            const fileIndex = files.findIndex((file) => file.getName() === fileName);
            if (fileIndex !== -1) {
                // Remove the file
                setFiles(files.toSpliced(fileIndex, 1));

                // Switch to the previous tab
                if (fileIndex - 1 >= 0) {
                    setCurrentFileName(files[fileIndex - 1].getName());
                }
            }
        }
    };

    return (
        <div>
            <header>
                <Menubar
                    recentFiles={recentFileNames}
                    onFileOpen={openFile}
                    onFileClose={() => {
                        if (currentFileName !== undefined) {
                            closeFile(currentFileName);
                        }
                    }}
                />
            </header>
            <main>
                <FileTabs
                    files={files}
                    fileName={currentFileName}
                    onFileChange={setCurrentFileName}
                    onFileClose={closeFile}
                />
            </main>
        </div>
    );
}
