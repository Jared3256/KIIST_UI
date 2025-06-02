import {Box, Tab, tabClasses, TabList, TabPanel, Tabs, Typography} from "@mui/joy"
import {
    DataGridPremium, GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD,
    useGridApiRef, useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';


const columns = [
    {field: 'id', headerName: 'ID', flex: 1, minWidth: 80},
    // {field: 'studentName', headerName: 'Student Name', width: 180},
    // {field: 'registrationNumber', headerName: 'Reg Number', width: 160},
    {field: 'paymentType', headerName: 'Payment Type', flex: 1, minWidth: 100},
    {field: 'amountPaid', headerName: 'Amount Paid (KES)', type: 'number', flex: 1, minWidth: 120},
    {field: 'paymentStatus', headerName: 'Status', flex: 1, minWidth: 100},
    {field: 'paymentDate', headerName: 'Date', type: 'date', flex: 1, minWidth: 100},
    {field: "paymentMethod", headerName: 'Payment Method', flex: 1, minWidth: 100},
];

const rows = [
    {
        id: 1,
        studentName: "Jared Omondi",
        registrationNumber: "COM/001/2023",
        paymentType: "Tuition",
        amountPaid: 35000,
        paymentStatus: "Confirmed",
        paymentDate: new Date("2025-05-10"),
        paymentMethod: "Mpesa"
    },
    {
        id: 2,
        studentName: "Evalyn Kimibei",
        registrationNumber: "BIT/204/2023",
        paymentType: "Library Fine",
        amountPaid: 200,
        paymentStatus: "Confirmed",
        paymentDate: new Date("2025-04-30"), paymentMethod: "Mpesa"
    },
    {
        id: 3,
        studentName: "Kevin Muriuki",
        registrationNumber: "SE/102/2024",
        paymentType: "Lab Fee",
        amountPaid: 1500,
        paymentStatus: "Pending",
        paymentDate: new Date("2025-05-20"), paymentMethod: "Mpesa"
    },
    {
        id: 4,
        studentName: "Grace Atieno",
        registrationNumber: "CS/120/2022",
        paymentType: "Hostel",
        amountPaid: 9000,
        paymentStatus: "Confirmed",
        paymentDate: new Date("2025-05-18"), paymentMethod: "Mpesa"
    },
    {
        id: 5,
        studentName: "Collins Mutua",
        registrationNumber: "IT/333/2021",
        paymentType: "Tuition",
        amountPaid: 40000,
        paymentStatus: "Confirmed",
        paymentDate: new Date("2025-05-22"), paymentMethod: "Mpesa"
    },
    {
        id: 6,
        studentName: "Sarah Nduta",
        registrationNumber: "SE/030/2023",
        paymentType: "Sports Fee",
        amountPaid: 1200,
        paymentStatus: "Pending",
        paymentMethod: "Mpesa",
        paymentDate: new Date("2025-05-27"), paymentMethod: "Mpesa"
    },
    {
        id: 7,
        studentName: "Brian Okoth",
        registrationNumber: "BIT/004/2023",
        paymentType: "Library Fine",
        amountPaid: 300,
        paymentStatus: "Confirmed",
        paymentMethod: "Mpesa",
        paymentDate: new Date("2025-05-15"),
    },
    {
        id: 8,
        studentName: "Mercy Wanjiku",
        registrationNumber: "CS/089/2023",
        paymentType: "Lab Fee",
        amountPaid: 1800,
        paymentStatus: "Confirmed",
        paymentMethod: "Mpesa",
        paymentDate: new Date("2025-05-25"),
    },
    {
        id: 9,
        studentName: "James Kipkoech",
        registrationNumber: "IT/550/2022",
        paymentType: "Tuition",
        amountPaid: 38000,
        paymentStatus: "Confirmed",
        paymentMethod: "Mpesa",
        paymentDate: new Date("2025-05-28"),
    },
    {
        id: 10,
        studentName: "Joan Were",
        registrationNumber: "SE/007/2023",
        paymentType: "Hostel",
        amountPaid: 10000,
        paymentStatus: "Pending",
        paymentMethod: "Mpesa",
        paymentDate: new Date("2025-05-29"),
    },
    {
        id: 11,
        studentName: "Peter Ouma",
        registrationNumber: "CS/402/2023",
        paymentType: "Sports Fee",
        amountPaid: 1000,
        paymentStatus: "Confirmed",
        paymentMethod: "Mpesa",
        paymentDate: new Date("2025-05-17"),
    },
    {
        id: 12,
        studentName: "Naomi Chebet",
        registrationNumber: "IT/390/2022",
        paymentType: "Library Fine",
        amountPaid: 150,
        paymentStatus: "Confirmed",
        paymentMethod: "Mpesa",
        paymentDate: new Date("2025-05-23"),
    },
    {
        id: 13,
        studentName: "Tom Onyango",
        registrationNumber: "BIT/212/2023",
        paymentType: "Tuition",
        amountPaid: 42000,
        paymentStatus: "Confirmed",
        paymentMethod: "Mpesa",
        paymentDate: new Date("2025-05-19"),
    },
    {
        id: 14,
        studentName: "Linet Kiplangat",
        registrationNumber: "SE/001/2022",
        paymentType: "Lab Fee",
        amountPaid: 1300,
        paymentStatus: "Confirmed",
        paymentMethod: "Mpesa",
        paymentDate: new Date("2025-05-24"),
    },
    {
        id: 15,
        studentName: "Kelvin Oloo",
        registrationNumber: "CS/208/2023",
        paymentType: "Tuition",
        amountPaid: 35000,
        paymentStatus: "Pending",
        paymentMethod: "Mpesa",
        paymentDate: new Date("2025-05-30"),
    },
    {
        id: 16,
        studentName: "Ann Wambui",
        registrationNumber: "SE/311/2023",
        paymentType: "Hostel",
        amountPaid: 9500,
        paymentStatus: "Confirmed",
        paymentMethod: "Mpesa",
        paymentDate: new Date("2025-05-20"),
    },
    {
        id: 17,
        studentName: "Daniel Kimani",
        registrationNumber: "IT/403/2021",
        paymentType: "Lab Fee",
        amountPaid: 1600,
        paymentStatus: "Confirmed",
        paymentMethod: "Mpesa",
        paymentDate: new Date("2025-05-26"),
    },
    {
        id: 18,
        studentName: "Sharon Otieno",
        registrationNumber: "BIT/111/2023",
        paymentType: "Sports Fee",
        amountPaid: 900,
        paymentStatus: "Pending",
        paymentMethod: "Mpesa",
        paymentDate: new Date("2025-05-27"),
    },
    {
        id: 19,
        studentName: "Vincent Kiprotich",
        registrationNumber: "CS/209/2022",
        paymentType: "Library Fine",
        amountPaid: 250,
        paymentStatus: "Confirmed",
        paymentMethod: "Mpesa",
        paymentDate: new Date("2025-05-18"),
    },
    {
        id: 20,
        studentName: "Mary Njeri",
        registrationNumber: "SE/333/2023",
        paymentType: "Tuition",
        amountPaid: 36000,
        paymentStatus: "Confirmed",
        paymentMethod: "Mpesa",
        paymentDate: new Date("2025-05-28"),
    },
];


export default function StudentFinance() {


    const apiRef = useGridApiRef();

    const initialState = useKeepGroupedColumnsHidden({
        apiRef,
        initialState: {
            sorting: {
                sortModel: [{field: GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD, sort: 'asc'}],
            },
            aggregation: {
                model: {
                    quantity: 'sum',
                },
            },
        }
    })
    return (
        <Box component={"main"} px={2} mt={{xs: 8, sm: 8, md: 2, lg: 2, xl: 2}}

        ><Tabs variant={"outlined"} defaultValue={0} sx={{
            width: "100%", overflow: 'auto'
        }}>
            <TabList disableUnderline={true} tabFlex={1} sx={{
                width: "100%",
                [`& .${tabClasses.root}`]: {
                    fontSize: 'sm',
                    fontWeight: 'lg',
                    [`&[aria-selected="true"]`]: {
                        color: 'primary.500',
                        bgcolor: 'background.surface',
                    },
                    [`&.${tabClasses.focusVisible}`]: {
                        outlineOffset: '-4px',
                    },
                },
            }}>
                <Tab variant={"soft"} sx={{flexGrow: 1}}>My Payment</Tab>
                <Tab variant={"soft"} sx={{flexGrow: 1}}>Pay now</Tab>
            </TabList>
            <TabPanel value={0}>
                <Box p={2}>
                    <DataGridPremium initialState={initialState} label={"Jared Odhiambo | KIIST/ART/0001/2025"}
                                     columns={columns}
                                     showToolbar={true}
                                     rows={rows}/>
                </Box>
            </TabPanel>
            <TabPanel value={1}>
                <Typography>Pay now Coming soon</Typography>
            </TabPanel>
        </Tabs></Box>
    )
}
