// ClientTable.js
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const sheetMappings = {
    "Natasha ACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1240916250" },
    "Natasha INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1540701091" },
    "Nazarii Kramar Active!": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "90018042" },
    "N Kramar ACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: null },
    "N Kramar INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "2012750231" },
    "Nikita ACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: null },
    "Nikita Shakotko Active!": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "2113883320" },
    "Nikita INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "503637199" },
    "Ruslan ACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1401851167" },
    "Ruslan Dawydenko Active!": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "668133830" },
    "Ruslan INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "416038541" },
    "Alex Megas Active!": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "310291825" },
    "Megas INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "430621295" },
    "Vlad (new) ACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: null },
    "Vlad (new) INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: null },
    "Vladytslav Shkliarov Active!": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: null },
    "Nebojsa ACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1695684781" },
    "Nebojsa INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1392500008" },
    "Nebojsa Active!": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "299232860" },
    "Mark Tarytsanu Active!": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1327900089" },
    "Mark INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1972066586" },
    "Anton ACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "891833206" },
    "Anton Zhidkov ACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1334264924" },
    "Anton INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1822325838" },
    "Julia ACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1910261012" },
    "Julia Krendeleva Active!": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "828755112" },
    "Julia INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "352885166" },
    "Arkadiy ACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: null },
    "Arkadiy Osokin Active!": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1436572648" },
    "Arkadiy INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "520725355" },
    "Olga ACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1884425070" },
    "Olga Meshcheryakova Active!": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "449469755" },
    "Olga INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "285512120" },
    "Kolya Solomennyi Active!": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "11031933" },
    "Kolya INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1623940457" },
    "Nataliia Denisenko Active": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "774640725" },
    "Nataliia D INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1563493966" },
    "Nataliia Grek Active": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1800218305" },
    "Nataliia G INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1862483022" },
    "Alina Kolpakova Active!": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1897384161" },
    "Alina Kolpakova InActive": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "99503959" },
    "Maryna Urvantseva ACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1621382825" },
    "Maryna Urvantseva INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "519635099" },
    "Dmytro Chernuha ACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1352980819" },
    "Dmytro Chernuha INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "57061661" },
    "Nikita Yagunov ACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1944189408" },
    "Nikita Yagunov INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "673863445" },
    "Alexandra Belova ACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "962214485" },
    "Alexandra Belova INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1886272138" },
    "Diana Romaniuk ACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "174663765" },
    "Diana Romaniuk INACTIVE": { sheetId: "1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y", gid: "1986505364" }
};


const ClientTable = ({ selectedTab }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const mapping = sheetMappings[selectedTab];
        if (!mapping) return;

        // Формируем URL для получения данных из Google Sheets
        const url = `/api/data?sheetId=${mapping.sheetId}&range=${encodeURIComponent(mapping.range)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.values) {
                    setData(data.values);
                } else {
                    setData([]);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setData([]);
            });
    }, [selectedTab]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {data[0]?.map((header, index) => (
                            <TableCell key={index}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(1).map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex}>{cell}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ClientTable;
