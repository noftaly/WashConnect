import AdCover from '../assets/mocked_ad_img.jpg';

const machines = [
    {
        id: 0,
        title: 'Washing Machine',
        description: "Samsung 10kg Front Load Washing Machine WW10M86LQWA/TL",
        manufacturer: 'Samsung',
        image: AdCover,
        price_washing_machine: 1,
        price_dryer: 1,
        price_wash_dry: 2,
        detergent_included: true,
        max_capacity: 10,
        cycle_wash_duration: 30,
        cycle_dry_duration: 60,
        hasWasher: true,
        hasDryer: true,
    },
    {
        id: 1,
        title: 'Washing Machine',
        description: "Bosch 20kg Front Load Washing Machine WAW28460ZA",
        manufacturer: 'Bosh',
        image: AdCover,
        price_washing_machine: 3,
        price_dryer: 0,
        price_wash_dry: 3,
        detergent_included: true,
        max_capacity: 20,
        cycle_wash_duration: 40,
        cycle_dry_duration: 0,
        hasWasher: true,
        hasDryer: false,
    },
    {
        id: 2,
        title: 'Washing Machine',
        description: "Electrolux 13kg Front Load Washing Machine EWF12742",
        manufacturer: 'Electrolux',
        image: AdCover,
        price_washing_machine: 2,
        price_dryer: 1,
        price_wash_dry: 3,
        detergent_included: false,
        max_capacity: 13,
        cycle_wash_duration: 35,
        cycle_dry_duration: 55,
        hasWasher: true,
        hasDryer: true,
    }
];

export default machines;    