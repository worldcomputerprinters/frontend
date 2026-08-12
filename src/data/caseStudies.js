// TODO: replace with the client's real project descriptions and results.
// Add a photo for any entry by dropping a file at the path in `image`
// (e.g. public/images/case-studies/office-setup.webp) — entries without
// one keep showing the icon placeholder automatically.
export const caseStudies = [
  {
    id: "Motherboard Repair",
    title: "Motherboard Repair",
    description: `
    Problem
    A student’s laptop suddenly stopped turning on. Two other shops had diagnosed it as a dead motherboard, but the customer wanted his important project files checked before replacing the laptop.

    Diagnosis
    We inspected the motherboard and tested the power circuit with a multimeter. We found a short near the charging circuit caused by a faulty or mismatched charger.

    Solution
    We replaced the damaged component and two nearby worn components, cleaned the board, and thoroughly tested the laptop.

    Result
    The laptop powered on and worked normally again, including charging, USB ports, and display. All data remained safe, saving the customer the cost of a new laptop.`,

    result: "A damaged motherboard restored and the laptop fully operational again.",
    icon: "Monitor",
    image: "/images/case-studies/motherboard-repair.webp",
  },
  
  {
    id: "gaming-pc-setup",
    title: "Gaming PC Setup",
    description: `
    Problem
    A customer wanted a complete gaming setup, including a PC, gaming monitor, keyboard, mouse, speakers, and headphones, but needed help choosing and setting up compatible components.

    Diagnosis
    We checked all components for compatibility, including the motherboard, RAM, GPU, power supply, case, monitor, and peripherals.

    Solution
    We built the PC from scratch with proper cable management, connected the full gaming setup, installed Windows and drivers, and optimized the display and audio settings.

   Result
   The entire setup worked perfectly from day one. The PC ran smoothly with stable temperatures, while the monitor and audio performed as expected.`,

    result: "A complete gaming setup built, configured, and ready to play.",
    icon: "Cpu",
    image: "/images/case-studies/gaming-pc-setup.webp",
  },

  {
    id: "printer-installation",
    title: "Broken Laptop Screen Replacement",
    description: `
    Problem
    A customer’s laptop was dropped, badly cracking the screen. The laptop still powered on, but the display had lines, dark patches, and blank areas.

    Diagnosis
    We tested the laptop with an external monitor and confirmed the motherboard, RAM, and storage were working properly. We then identified the exact screen model and specifications.

    Solution
    We sourced a genuine replacement screen, carefully installed it, and tested the display, brightness, colors, and touch functionality.

    Result
    The display was fully restored with no lines or dark spots, and all data remained safe.`,
    result: "A cracked laptop screen replaced and the laptop fully restored to working condition.",
    icon: "Printer",
    image: "/images/case-studies/screen-fix.webp",
  },

  {
    id: "networking-project",
    title: "Networking Project",
    description: `
    Problem
    A local office had weak WiFi, with poor or no signal in the back offices and meeting room, causing dropped calls and connection issues.

    Diagnosis
    We tested signal strength throughout the office and found that thick walls and a single poorly positioned router were causing the coverage problems.

    Solution
    We installed structured network cabling and strategically positioned access points for full coverage. The network was configured and tested in every room.

    Result
    The office now has strong, stable WiFi throughout the building, with no dead zones or dropped connections.
    `,
    result: "Full-office WiFi coverage with a reliable, professionally planned network.",
    icon: "Router",
    image: "/images/case-studies/networking-project.webp",
  },
];
