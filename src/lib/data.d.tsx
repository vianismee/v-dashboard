import { IJob } from "@/types/job";

export const jobData: IJob[] = [
  {
    job_id: 1024,
    user: "jane.doe@example.com",
    status: "Artwork",
    brand: [
      {
        brand_id: 987,
        name: "FreshGlow",
        type: "Skincare",
        product: [
          {
            product_id: 5001,
            name: "Vitamin C Serum",
            size: 30,
            packaging: "Glass Bottle with Dropper",
            label_raw: "raw_label_vc_serum_v1.ai",
            innerbox: "box_template_serum_small.pdf",
          },
          {
            product_id: 5002,
            name: "Hydrating Face Cleanser",
            size: 150,
            packaging: "Plastic Squeeze Tube",
            label_raw: "raw_label_cleanser_v3.psd",
          },
        ],
      },
    ],
  },
  {
    job_id: 1025,
    user: "john.smith@example.com",
    status: "Approval 1",
    brand: [
      {
        brand_id: 988,
        name: "NutriCrunch",
        type: "Snacks",
        product: [
          {
            product_id: 6101,
            name: "Almond & Honey Granola Bar",
            size: 45,
            packaging: "Foil Wrapper",
            label_raw: "raw_label_granola_honey.ai",
          },
          {
            product_id: 6102,
            name: "Sea Salt Lentil Chips",
            size: 120,
            packaging: "Matte Finish Bag",
            label_raw: "raw_label_lentil_chips_v2.ai",
            innerbox: "shipping_box_template_chips_case.pdf",
          },
        ],
      },
      {
        brand_id: 989,
        name: "AquaSplash",
        type: "Beverage",
        product: [
          {
            product_id: 7205,
            name: "Sparkling Lemon Water",
            size: 500,
            packaging: "Aluminum Can",
            label_raw: "raw_label_sparkling_lemon.eps",
          },
        ],
      },
    ],
  },
  {
    job_id: 1026,
    user: "susan.b@example.com",
    status: "Revisi",
    brand: [
      {
        brand_id: 990,
        name: "HomeBright",
        type: "Cleaning Supplies",
        product: [
          {
            product_id: 8311,
            name: "All-Purpose Cleaner",
            size: 750,
            packaging: "Spray Bottle",
            label_raw: "raw_label_cleaner_lavender.ai",
            innerbox: "case_pack_cleaner_x12.pdf",
          },
        ],
      },
    ],
  },
];
