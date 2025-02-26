import { Companies, Company } from "./companies";

interface StoryRanking {
  filename: string;
  title: string;
  date: string;
  summary: string;
  company: Company | undefined;
}

export const storyRankings: StoryRanking[] = [
  {
    filename: "deshaw.md",
    title: "D. E. Shaw & Co.",
    date: "1992-1994",
    summary: "",
    company: Companies["D. E. Shaw"],
  },
  {
    filename: "chasebank.md",
    title: "Chase Manhattan Bank",
    date: "1990-1992",
    summary: "",
    company: Companies["J.P. Morgan"],
  },
  {
    filename: "apple.md",
    title: "Apple Computer Inc.",
    date: "1994-1996",
    summary: "",
    company: Companies.Apple,
  },
  {
    filename: "JavaSoft.md",
    title: "JavaSoft",
    date: "1997",
    summary: "",
    company: Companies["Sun Microsystems"], // JavaSoft was a Sun Microsystems division
  },
  {
    filename: "cisco_ios.md",
    title: "Cisco",
    date: "2008",
    summary: "",
    company: Companies.Cisco,
  },
  {
    filename: "Intuit.md",
    title: "Intuit",
    date: "2005-2007",
    summary: "",
    company: Companies["Intuit"],
  },
  {
    filename: "hewlettpackard.md",
    title: "Hewlett-Packard",
    date: "1988-1990",
    summary: "",
    company: Companies["Hewlett-Packard"],
  },
  {
    filename: "UVA.md",
    title: "University of Virginia School of Medicine",
    date: "1979-1986",
    summary: "",
    company: Companies["University of Virginia"],
  },
  {
    filename: "JavaFX.md",
    title: "JavaFX",
    date: "2008",
    summary: "",
    company: Companies["Oracle Corporation"],
  },
  {
    filename: "beyondnews.md",
    title: "Beyond News Inc",
    date: "1996-1997",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "c2btech.md",
    title: "C2B Technologies Inc.",
    date: "1997-1998",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "netflix_prize.md",
    title: "Netflix Prize Competition",
    date: "2008",
    summary: "",
    company: Companies.Netflix,
  },
  {
    filename: "rpi.md",
    title: "RPI - 'Knowledge and Thoroughness'",
    date: "1984-1988",
    summary: "",
    company: Companies["Rensselaer Polytechnic Institute"],
  },
  {
    filename: "resultsbyiq.md",
    title: "SGI/Cray Division",
    date: "2014",
    summary: "",
    company: Companies["Hewlett-Packard"],
  },
  {
    filename: "valueclick.md",
    title: "ValueClick",
    date: "2012",
    summary: "",
    company: undefined,
  },
  {
    filename: "fastterm.md",
    title: "Fast-Term",
    date: "1984-1986",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "asic1.md",
    title: "Myarc pt.1",
    date: "1986",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "asic2.md",
    title: "Myarc pt.2",
    date: "1987",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "best_day.md",
    title: "Permission TV",
    date: "2005",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "compuserve.md",
    title: "Compuserve TIFORUM",
    date: "1983-1990",
    summary: "",
    company: Companies["CompuServe"],
  },
  {
    filename: "cyber currency 101.md",
    title: "CBDC",
    date: "2018",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "electrofiberoptic.md",
    title: "Electro Fiber Optic Corp",
    date: "1990",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "genasm.md",
    title: "GenAsm",
    date: "1989",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "genlib.md",
    title: "GenLib",
    date: "1989",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "genlink.md",
    title: "GenLink",
    date: "1989",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "genmake.md",
    title: "GenMake",
    date: "1989",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "genref.md",
    title: "GenRef",
    date: "1989",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "home construction.md",
    title: "Home Construction",
    date: "Unknown",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "laser-printer.md",
    title: "Home Brew Laser Printer",
    date: "1982",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "magnifi.md",
    title: "Magnifi Inc.",
    date: "1997",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "miracleofvirginia.md",
    title: "Miracle of Virginia",
    date: "1984",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "Myarc.md",
    title: "Myarc Computers Inc.",
    date: "1985-1989",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "national merit.md",
    title: "National Merit Finalist",
    date: "Unknown",
    summary: "",
    company: undefined, // Not in Companies list
  },
  {
    filename: "PaperRoute.md",
    title: "Paper Route",
    date: "1976-1983",
    summary: "",
    company: undefined, // Not in Companies list
  },
];
