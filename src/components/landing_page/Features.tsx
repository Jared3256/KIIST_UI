// import * as React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import MuiChip from "@mui/material/Chip";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import { styled } from "@mui/material/styles";

// import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
// import EdgesensorHighRoundedIcon from "@mui/icons-material/EdgesensorHighRounded";
// import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";

// const items = [
//   {
//     icon: <ViewQuiltRoundedIcon />,
//     title: "Hands-On Labs",
//     description:
//       "State-of-the-art computer, electronics and science labs where theory becomes practice.",
//     imageLight: `url("https://example.com/images/lab-light.jpg")`,
//     imageDark: `url("https://example.com/images/lab-dark.jpg")`,
//   },
//   {
//     icon: <EdgesensorHighRoundedIcon />,
//     title: "Expert Faculty",
//     description:
//       "Learn from seasoned engineers and researchers dedicated to mentoring the next tech leaders.",
//     imageLight: `url("https://example.com/images/faculty-light.jpg")`,
//     imageDark: `url("https://example.com/images/faculty-dark.jpg")`,
//   },
//   {
//     icon: <DevicesRoundedIcon />,
//     title: "Industry Connect",
//     description:
//       "Real internships, hackathons and employer networking events to bridge campus and career.",
//     imageLight: `url("https://example.com/images/network-light.jpg")`,
//     imageDark: `url("https://example.com/images/network-dark.jpg")`,
//   },
// ];

// interface ChipProps {
//   selected?: boolean;
// }

// const Chip = styled(MuiChip)<ChipProps>(({ theme }) => ({
//   variants: [
//     {
//       props: ({ selected }) => !!selected,
//       style: {
//         background:
//           "linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))",
//         color: "hsl(0, 0%, 100%)",
//         borderColor: (theme.vars || theme).palette.primary.light,
//         "& .MuiChip-label": {
//           color: "hsl(0, 0%, 100%)",
//         },
//         ...theme.applyStyles("dark", {
//           borderColor: (theme.vars || theme).palette.primary.dark,
//         }),
//       },
//     },
//   ],
// }));

// interface MobileLayoutProps {
//   selectedItemIndex: number;
//   handleItemClick: (index: number) => void;
//   selectedFeature: (typeof items)[0];
// }

// export function MobileLayout({
//   selectedItemIndex,
//   handleItemClick,
//   selectedFeature,
// }: MobileLayoutProps) {
//   if (!items[selectedItemIndex]) {
//     return null;
//   }

//   return (
//     <Box
//       sx={{
//         display: { xs: "flex", sm: "none" },
//         flexDirection: "column",
//         gap: 2,
//       }}
//     >
//       <Box sx={{ display: "flex", gap: 2, overflow: "auto" }}>
//         {items.map(({ title }, index) => (
//           <Chip
//             size="medium"
//             key={index}
//             label={title}
//             onClick={() => handleItemClick(index)}
//             selected={selectedItemIndex === index}
//           />
//         ))}
//       </Box>
//       <Card variant="outlined">
//         <Box
//           sx={(theme) => ({
//             mb: 2,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             minHeight: 280,
//             backgroundImage: "var(--items-imageLight)",
//             ...theme.applyStyles("dark", {
//               backgroundImage: "var(--items-imageDark)",
//             }),
//           })}
//           style={
//             items[selectedItemIndex]
//               ? ({
//                   "--items-imageLight": items[selectedItemIndex].imageLight,
//                   "--items-imageDark": items[selectedItemIndex].imageDark,
//                 } as any)
//               : {}
//           }
//         />
//         <Box sx={{ px: 2, pb: 2 }}>
//           <Typography
//             gutterBottom
//             sx={{ color: "text.primary", fontWeight: "medium" }}
//           >
//             {selectedFeature.title}
//           </Typography>
//           <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
//             {selectedFeature.description}
//           </Typography>
//         </Box>
//       </Card>
//     </Box>
//   );
// }

// export default function Features() {
//   const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

//   const handleItemClick = (index: number) => {
//     setSelectedItemIndex(index);
//   };

//   const selectedFeature = items[selectedItemIndex];

//   return (
//     <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
//       <Box sx={{ width: { sm: "100%", md: "60%" } }}>
//         <Typography
//           component="h2"
//           variant="h4"
//           gutterBottom
//           sx={{ color: "text.primary" }}
//         >
//           Core Campus Features
//         </Typography>
//         <Typography
//           variant="body1"
//           sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}
//         >
//           At Kisii Impact Institute, we blend practical training, expert
//           mentorship, and industry engagement to prepare you for tomorrow’s tech
//           challenges today.
//         </Typography>
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row-reverse" },
//           gap: 2,
//         }}
//       >
//         <div>
//           <Box
//             sx={{
//               display: { xs: "none", sm: "flex" },
//               flexDirection: "column",
//               gap: 2,
//               height: "100%",
//             }}
//           >
//             {items.map(({ icon, title, description }, index) => (
//               <Box
//                 key={index}
//                 component={Button}
//                 onClick={() => handleItemClick(index)}
//                 sx={[
//                   (theme) => ({
//                     p: 2,
//                     height: "100%",
//                     width: "100%",
//                     "&:hover": {
//                       backgroundColor: (theme.vars || theme).palette.action
//                         .hover,
//                     },
//                   }),
//                   selectedItemIndex === index && {
//                     backgroundColor: "action.selected",
//                   },
//                 ]}
//               >
//                 <Box
//                   sx={[
//                     {
//                       width: "100%",
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "left",
//                       gap: 1,
//                       textAlign: "left",
//                       textTransform: "none",
//                       color: "text.secondary",
//                     },
//                     selectedItemIndex === index && {
//                       color: "text.primary",
//                     },
//                   ]}
//                 >
//                   {icon}

//                   <Typography variant="h6">{title}</Typography>
//                   <Typography variant="body2">{description}</Typography>
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//           <MobileLayout
//             selectedItemIndex={selectedItemIndex}
//             handleItemClick={handleItemClick}
//             selectedFeature={selectedFeature}
//           />
//         </div>
//         <Box
//           sx={{
//             display: { xs: "none", sm: "flex" },
//             width: { xs: "100%", md: "70%" },
//             height: "var(--items-image-height)",
//           }}
//         >
//           <Card
//             variant="outlined"
//             sx={{
//               height: "100%",
//               width: "100%",
//               display: { xs: "none", sm: "flex" },
//               pointerEvents: "none",
//             }}
//           >
//             <Box
//               sx={(theme) => ({
//                 m: "auto",
//                 width: 420,
//                 height: 500,
//                 backgroundSize: "contain",
//                 backgroundImage: "var(--items-imageLight)",
//                 ...theme.applyStyles("dark", {
//                   backgroundImage: "var(--items-imageDark)",
//                 }),
//               })}
//               style={
//                 items[selectedItemIndex]
//                   ? ({
//                       "--items-imageLight": items[selectedItemIndex].imageLight,
//                       "--items-imageDark": items[selectedItemIndex].imageDark,
//                     } as any)
//                   : {}
//               }
//             />
//           </Card>
//         </Box>
//       </Box>
//     </Container>
//   );
// }


import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import MuiChip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import EdgesensorHighRoundedIcon from "@mui/icons-material/EdgesensorHighRounded";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: "Hands-On Labs",
    description:
      "State-of-the-art computer, electronics and science labs where theory becomes practice.",
    imageLight: `url("https://scontent.fnbo19-1.fna.fbcdn.net/v/t39.30808-6/482058486_696841359365411_6812183362713966894_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEZk4FQHYntpOnMpYWH7zEHAYIGCmzdo7kBggYKbN2juURx1_ao85UpTC6SFh4dmu3Qu50qSDNSTM7KuYQaWNVp&_nc_ohc=IqNEKLh3fxYQ7kNvwHz05wn&_nc_oc=AdmDhP3GAjJNSaF2QVEoOP1d3C7-XAp5BhxaGVNI3_yfoM9LarV3zE_LqUIVNgeMuhNIBMKTUEuBD4Z0Y_IEfEKm&_nc_zt=23&_nc_ht=scontent.fnbo19-1.fna&_nc_gid=QRHXBD1cAErIJTfsuAmsNQ&oh=00_AfJGhi6ZY1rJHLPN3ECC3rc2V_ie1Qas2v--lrv2smsK5A&oe=682EBEBD")`,
    imageDark: `url("https://mui.com/static/images/templates/templates-images/dash-dark.png")`,
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: "Expert Faculty",
    description:
      "Learn from seasoned engineers and researchers dedicated to mentoring the next tech leaders.",
    imageLight: `url("https://scontent.fnbo19-2.fna.fbcdn.net/v/t39.30808-6/482986204_696648789384668_8790755088055630926_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGkFzLff60KC0owBusKAlUk7Xghr6aH0v3teCGvpofS_decMRwYyAUdFtUVjJiKO-qpZIHmZcrNCrxo5fhkzJEU&_nc_ohc=ubqxqsSRQKoQ7kNvwEQzbs5&_nc_oc=AdnHh_5NPYLU4MKQonfcvjiRmJfnPqa2btz9QasBT4CZ2Y5QdzvGT6TWtfbM8saHkhuN97mH27OssTkeyuN6QQ71&_nc_zt=23&_nc_ht=scontent.fnbo19-2.fna&_nc_gid=nMM-ezIxfAE_tlEQp8RgQA&oh=00_AfIv1vwx1jn6TATtoVzXMsFqiY-0AznABhgNQOgG5kjqPA&oe=682EA546")`,
    imageDark: `url("https://mui.com/static/images/templates/templates-images/mobile-dark.png")`,
  },
  {
    icon: <DevicesRoundedIcon />,
    title: "Industry Connect",
    description:
      "Real internships, hackathons and employer networking events to bridge campus and career.",
    imageLight: `url("https://scontent.fnbo19-1.fna.fbcdn.net/v/t39.30808-6/481076708_696646839384863_3973153258995851157_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE9WMSB3lscJoeRLJlskH-JbGOx71yFjCVsY7HvXIWMJZ0D0t5ffjbmJMOjJR1rWcB6CvOQ_iVQDNR76K5AYeIC&_nc_ohc=b3X3DvmlaeUQ7kNvwEiUF8A&_nc_oc=Adlpy2M7k_DmkJPeZ2rJULSi2bjTU8nqOnuBIPsJz-99A_iLQ2U3IXqlIfrB7-rwFlOUnt2CvGltzk5GOdbSdxZw&_nc_zt=23&_nc_ht=scontent.fnbo19-1.fna&_nc_gid=xekwgJ8SYehK8e5JAOCsRA&oh=00_AfIa5Kgz88UMVLGaZ6V-0Djctjcg2Dgj23Nk8B8JjbUd2g&oe=682EAE27")`,
    imageDark: `url("https://mui.com/static/images/templates/templates-images/devices-dark.png")`,
  },
];

interface ChipProps {
  selected?: boolean;
}

const Chip = styled(MuiChip)<ChipProps>(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => !!selected,
      style: {
        background:
          "linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))",
        color: "#fff",
        borderColor: (theme.vars || theme).palette.primary.light,
        "& .MuiChip-label": {
          color: "#fff",
        },
        ...theme.applyStyles("dark", {
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));

interface MobileLayoutProps {
  selectedItemIndex: number;
  handleItemClick: (index: number) => void;
  selectedFeature: (typeof items)[0];
}

export function MobileLayout({
  selectedItemIndex,
  handleItemClick,
  selectedFeature,
}: MobileLayoutProps) {
  if (!items[selectedItemIndex]) {
    return null;
  }

  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, overflow: "auto" }}>
        {items.map(({ title }, index) => (
          <Chip
            size="medium"
            key={index}
            label={title}
            onClick={() => handleItemClick(index)}
            selected={selectedItemIndex === index}
          />
        ))}
      </Box>
      <Card variant="outlined">
        <Box
          sx={(theme) => ({
            mb: 2,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: 280,
            backgroundImage: "var(--items-imageLight)",
            ...theme.applyStyles("dark", {
              backgroundImage: "var(--items-imageDark)",
            }),
          })}
          style={
            items[selectedItemIndex]
              ? ({
                  "--items-imageLight": items[selectedItemIndex].imageLight,
                  "--items-imageDark": items[selectedItemIndex].imageDark,
                } as any)
              : {}
          }
        />
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography
            gutterBottom
            sx={{ color: "text.primary", fontWeight: "medium" }}
          >
            {selectedFeature.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
            {selectedFeature.description}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box sx={{ width: { sm: "100%", md: "60%" } }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          Campus Features
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}
        >
          Discover how Kisii Impact Institute equips you for success with
          real-time dashboards, a mobile campus app, and platform-agnostic
          access for seamless learning anywhere.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row-reverse" },
          gap: 2,
        }}
      >
        <div>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Box
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  (theme) => ({
                    p: 2,
                    height: "100%",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: (theme.vars || theme).palette.action
                        .hover,
                    },
                  }),
                  selectedItemIndex === index && {
                    backgroundColor: "action.selected",
                  },
                ]}
              >
                <Box
                  sx={[
                    {
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "left",
                      gap: 1,
                      textAlign: "left",
                      textTransform: "none",
                      color: "text.secondary",
                    },
                    selectedItemIndex === index && {
                      color: "text.primary",
                    },
                  ]}
                >
                  {icon}
                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="body2">{description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <MobileLayout
            selectedItemIndex={selectedItemIndex}
            handleItemClick={handleItemClick}
            selectedFeature={selectedFeature}
          />
        </div>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            width: { xs: "100%", md: "70%" },
            height: "var(--items-image-height)",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              width: "100%",
              display: { xs: "none", sm: "flex" },
              pointerEvents: "none",
            }}
          >
            <Box
              sx={(theme) => ({
                m: "auto",
                width: "90%",
                height: "100%",
                
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundImage: "var(--items-imageLight)",
                ...theme.applyStyles("dark", {
                  backgroundImage: "var(--items-imageDark)",
                }),
              })}
              style={
                items[selectedItemIndex]
                  ? ({
                      "--items-imageLight": items[selectedItemIndex].imageLight,
                      "--items-imageDark": items[selectedItemIndex].imageDark,
                    } as any)
                  : {}
              }
            />
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
