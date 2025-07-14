"use client";

import { useState } from "react";
import { Menubar } from "@/components/menubar";
import { FileTabs } from "@/components/file-tabs";
import GpxFile from "@/utils/GpxFile";

export default function Home() {
    const [files, setFiles] = useState<GpxFile[]>([]);
    const recentFileNames: string[] = [];
    const [currentFileName, setCurrentFileName] = useState<string>();

    const openFile = (gpxFile: GpxFile) => {
        // If the file is not already open
        if (files.findIndex((f) => f.name === gpxFile.name) === -1) {
            // Add the file
            setFiles(files.concat([gpxFile]));
        }

        // Switch to the new tab
        setCurrentFileName(gpxFile.name);
    };

    const closeFile = (fileName: string) => {
        if (fileName !== undefined) {
            const fileIndex = files.findIndex((file) => file.name === fileName);
            if (fileIndex !== -1) {
                // Remove the file
                setFiles(files.toSpliced(fileIndex, 1));

                // Switch to the previous tab
                if (fileIndex - 1 >= 0) {
                    setCurrentFileName(files[fileIndex - 1].name);
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
