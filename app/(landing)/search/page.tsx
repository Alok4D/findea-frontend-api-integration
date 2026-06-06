"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ChevronRight } from "lucide-react";

import LandingTopAnnouncementBar from "../_components/LandingTopAnnouncementBar";
import Navbar from "../_components/Navbar";
import Container from "@/components/shared/Container";

import SearchHeader from "./_components/SearchHeader";
import SearchSidebar from "./_components/SearchSidebar";
import SearchSortBar from "./_components/SearchSortBar";
import SearchProductGrid from "./_components/SearchProductGrid";
import SearchPagination from "./_components/SearchPagination";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [availability, setAvailability] = useState<string[]>(["In Stock"]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const tabs = ["All", "Products", "Services", "Boutiques", "Registries"];

  const staticResults = [
    {
      id: 1,
      name: "Bacon Dress",
      category: "Blouses",
      description: "Contemporary Surplice Top",
      price: "$570.00",
      image: "https://images.unsplash.com/photo-1597354984706-fac992d9306f?q=80&w=688&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    {
      id: 2,
      name: "Sarah Kouamé",
      category: "Wellness & Beauty",
      description: "Hair — Styling",
      price: "$60-$120",
      image: "https://plus.unsplash.com/premium_photo-1661769750859-64b5f1539aa8?fm=jpg&q=60&w=3000&auto=format&fit=crop",
      type: "Service",
      badge: "Très Demandé",
      buttonText: "View Details",
      rating: "4.9 (149)"
    },
    {
      id: 3,
      name: "Artisan & Co.",
      category: "Home Decor",
      description: "Local Artisan • Verified • Homemade",
      price: "",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1170&auto=format&fit=crop",
      type: "Boutique",
      badge: "Featured",
      buttonText: "View Boutique",
      location: "San Francisco",
      rating: "4.9 (149)",
      tags: ["Local Artisan", "Verified", "Homemade"]
    },
    {
      id: 4,
      name: "Artisan & Co.",
      category: "Home Decor",
      description: "Local Artisan • Verified • Homemade",
      price: "",
      image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=735&auto=format&fit=crop",
      type: "Boutique",
      badge: "Featured",
      buttonText: "View Boutique",
      location: "San Francisco",
      rating: "4.9 (149)",
      tags: ["Local Artisan", "Verified", "Homemade"],
      isFeaturedCollection: true
    },
    {
      id: 5,
      name: "Bacon Dress",
      category: "Blouses",
      description: "Contemporary Surplice Top",
      price: "$570.00",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1026&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    {
      id: 6,
      name: "Bacon Dress",
      category: "Blouses",
      description: "Contemporary Surplice Top",
      price: "$570.00",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1173&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    {
      id: 7,
      name: "Floral Maxi Dress",
      category: "Fashion",
      description: "Elegant Summer Floral Print",
      price: "$320.00",
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=746&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart",
      badge: "New Arrival"
    },
    {
      id: 8,
      name: "Wedding Photography",
      category: "Photography",
      description: "Professional Event Coverage",
      price: "$1200 - $3500",
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=687&auto=format&fit=crop",
      type: "Service",
      buttonText: "View Details",
      badge: "Featured",
      rating: "5.0 (82)"
    },
    {
      id: 9,
      name: "Modern Sofa Set",
      category: "Home Decor",
      description: "Minimalist Living Room Furniture",
      price: "$2,450.00",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1170&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    {
      id: 10,
      name: "Bridal Registry",
      category: "Registries",
      description: "Curated Wedding Gift Lists",
      price: "From $0.00",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1169&auto=format&fit=crop",
      type: "Service",
      buttonText: "Create Registry",
      badge: "Trending"
    },
    {
      id: 11,
      name: "Silk Evening Gown",
      category: "Fashion",
      description: "Luxury Red Silk Dress",
      price: "$890.00",
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=708&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart",
      badge: "Featured"
    },
    {
      id: 12,
      name: "Diamond Earring",
      category: "Jewelry",
      description: "18k White Gold Diamonds",
      price: "$1,250.00",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=687&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    // Adding 50+ more items
    {
      id: 13,
      name: "Velvet Occasion Chair",
      category: "Home & Decor",
      description: "Mid-century modern accent chair",
      price: "$450.00",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    {
      id: 14,
      name: "Luxury Spa Retreat",
      category: "Wellness & Beauty",
      description: "Full day of pampering and relaxation",
      price: "$350.00",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
      type: "Service",
      buttonText: "Book Now",
      badge: "Popular"
    },
    {
      id: 15,
      name: "Parisian Boutique",
      category: "Fashion",
      description: "Hand-picked vintage collections from Paris",
      price: "",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
      type: "Boutique",
      location: "Paris",
      buttonText: "Explore"
    },
    {
      id: 16,
      name: "Baby Shower Registry",
      category: "Registries",
      description: "Essential items for your new arrival",
      price: "Custom",
      image: "https://www.paperlesspost.com/blog/wp-content/uploads/073123_Blog_SEO_RefreshHowToMakeABabyRegistry.png",
      type: "Registry",
      buttonText: "Start Registry"
    },
    {
      id: 17,
      name: "Handmade Ceramic Vase",
      category: "Home & Decor",
      description: "Unique terracotta glazed pottery",
      price: "$85.00",
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    {
      id: 18,
      name: "Personal Training Session",
      category: "Wellness & Beauty",
      description: "1-on-1 fitness coaching and nutrition",
      price: "$75.00/hr",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
      type: "Service",
      buttonText: "Schedule"
    },
    {
      id: 19,
      name: "The London Watch Co.",
      category: "Jewelry",
      description: "Exclusive timepieces and luxury watches",
      price: "",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop",
      type: "Boutique",
      location: "London",
      buttonText: "Visit Shop"
    },
    {
      id: 20,
      name: "Graduation Registry",
      category: "Registries",
      description: "Help your grad start their next chapter",
      price: "Custom",
      image: "https://img.buzzfeed.com/buzzfeed-static/static/2023-06/28/19/asset/6ac02f84ae6d/sub-buzz-1545-1687980698-1.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto",
      type: "Registry",
      buttonText: "Create Registry"
    },
    {
      id: 21,
      name: "Leather Messenger Bag",
      category: "Fashion",
      description: "Premium Italian leather briefcase",
      price: "$295.00",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    {
      id: 22,
      name: "Yoga Workshop",
      category: "Wellness & Beauty",
      description: "Mastering the art of mindfulness",
      price: "$120.00",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
      type: "Service",
      buttonText: "Join Now"
    },
    {
      id: 23,
      name: "Manhattan Loft Decor",
      category: "Home & Decor",
      description: "Modern industrial furniture and art",
      price: "",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
      type: "Boutique",
      location: "New York",
      buttonText: "Browse"
    },
    {
      id: 24,
      name: "Housewarming Registry",
      category: "Registries",
      description: "Gifts to make a new house a home",
      price: "Custom",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
      type: "Registry",
      buttonText: "View Registry"
    },
    {
      id: 25,
      name: "Minimalist Desk Lamp",
      category: "Home & Decor",
      description: "Adjustable LED light with wireless charging",
      price: "$125.00",
      image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=800&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    {
      id: 26,
      name: "Interior Design Consultation",
      category: "Home & Decor",
      description: "Professional room planning and styling",
      price: "$250.00",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
      type: "Service",
      buttonText: "Book Consultation"
    },
    {
      id: 27,
      name: "LA Fashion House",
      category: "Fashion",
      description: "Trendy streetwear and designer labels",
      price: "",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
      type: "Boutique",
      location: "Los Angeles",
      buttonText: "Shop Now"
    },
    {
      id: 28,
      name: "Retirement Registry",
      category: "Registries",
      description: "Celebrate a lifetime of achievement",
      price: "Custom",
      image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=800&auto=format&fit=crop",
      type: "Registry",
      buttonText: "Start Here"
    },
    {
      id: 29,
      name: "Cashmere Scarf",
      category: "Fashion",
      description: "100% pure Mongolian cashmere",
      price: "$145.00",
      image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    {
      id: 30,
      name: "Facial Skin Therapy",
      category: "Wellness & Beauty",
      description: "Organic treatments for glowing skin",
      price: "$95.00",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
      type: "Service",
      buttonText: "Book Spa"
    },
    {
      id: 31,
      name: "Classic Jewelry Co.",
      category: "Jewelry",
      description: "Timeless elegance and craftsmanship",
      price: "",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
      type: "Boutique",
      location: "Paris",
      buttonText: "View Collection"
    },
    {
      id: 32,
      name: "Anniversary Registry",
      category: "Registries",
      description: "Commemorate your years together",
      price: "Custom",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop",
      type: "Registry",
      buttonText: "Explore"
    },
    {
      id: 33,
      name: "Smart Coffee Maker",
      category: "Home & Decor",
      description: "Programmable with smartphone integration",
      price: "$210.00",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    {
      id: 34,
      name: "Professional Wardrobe Styling",
      category: "Fashion",
      description: "Curated outfits for your personal brand",
      price: "$180.00",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
      type: "Service",
      buttonText: "Book Stylist"
    },
    {
      id: 35,
      name: "Modern Home Boutique",
      category: "Home & Decor",
      description: "Chic decor for the contemporary home",
      price: "",
      image: "https://images.unsplash.com/photo-1513519247388-193461244651?q=80&w=800&auto=format&fit=crop",
      type: "Boutique",
      location: "London",
      buttonText: "Shop Store"
    },
    {
      id: 36,
      name: "New Business Registry",
      category: "Registries",
      description: "Everything you need to launch your startup",
      price: "Custom",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop",
      type: "Registry",
      buttonText: "Get Started"
    },
    {
      id: 37,
      name: "Gold Pendant Necklace",
      category: "Jewelry",
      description: "14k solid gold with a delicate chain",
      price: "$340.00",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    {
      id: 38,
      name: "Cooking Class Experience",
      category: "Wellness & Beauty",
      description: "Gourmet meal preparation with a top chef",
      price: "$150.00",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
      type: "Service",
      buttonText: "Reserve Spot"
    },
    {
      id: 39,
      name: "Village Arts & Crafts",
      category: "Home & Decor",
      description: "Local handmade gifts and souvenirs",
      price: "",
      image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=800&auto=format&fit=crop",
      type: "Boutique",
      location: "Los Angeles",
      buttonText: "View Gallery"
    },
    {
      id: 40,
      name: "Travel Adventure Registry",
      category: "Registries",
      description: "Fund your next big journey",
      price: "Custom",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
      type: "Registry",
      buttonText: "Plan Trip"
    },
    {
      id: 41,
      name: "Silk Pillowcase Set",
      category: "Wellness & Beauty",
      description: "Anti-aging mulberry silk for better sleep",
      price: "$65.00",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    {
      id: 42,
      name: "Makeup Masterclass",
      category: "Wellness & Beauty",
      description: "Professional tips for flawless application",
      price: "$110.00",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
      type: "Service",
      buttonText: "Enroll"
    },
    {
      id: 43,
      name: "Luxury Watch Boutique",
      category: "Jewelry",
      description: "Pre-owned and new high-end timepieces",
      price: "",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop",
      type: "Boutique",
      location: "New York",
      buttonText: "Discover"
    },
    {
      id: 44,
      name: "Birthday Milestone Registry",
      category: "Registries",
      description: "Make your big birthday unforgettable",
      price: "Custom",
      image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=800&auto=format&fit=crop",
      type: "Registry",
      buttonText: "Start Wishlist"
    },
    {
      id: 45,
      name: "Wireless Noise Cancelling Headphones",
      category: "Home & Decor",
      description: "Premium sound quality and comfort",
      price: "$349.00",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    {
      id: 46,
      name: "Dog Grooming & Styling",
      category: "Wellness & Beauty",
      description: "Treat your pet to a luxury spa day",
      price: "$80.00",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop",
      type: "Service",
      buttonText: "Book Appointment"
    },
    {
      id: 47,
      name: "Eco-Friendly Boutique",
      category: "Home & Decor",
      description: "Sustainable products for a greener lifestyle",
      price: "",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?q=80&w=800&auto=format&fit=crop",
      type: "Boutique",
      location: "Paris",
      buttonText: "Shop Green"
    },
    {
      id: 48,
      name: "Charity Donation Registry",
      category: "Registries",
      description: "Direct your gifts to causes you care about",
      price: "Custom",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
      type: "Registry",
      buttonText: "Donate Now"
    },
    {
      id: 49,
      name: "Aromatherapy Diffuser",
      category: "Wellness & Beauty",
      description: "Essential oil mister with color-changing LED",
      price: "$45.00",
      image: "https://images.unsplash.com/photo-1547038577-da80abbc4f19?q=80&w=800&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    {
      id: 50,
      name: "Car Detailing Service",
      category: "Services",
      description: "Complete interior and exterior deep clean",
      price: "$200.00",
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=800&auto=format&fit=crop",
      type: "Service",
      buttonText: "Schedule Wash"
    },
    {
      id: 51,
      name: "Vintage Vinyl Shop",
      category: "Home & Decor",
      description: "Rare records and classic turntable equipment",
      price: "",
      image: "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?q=80&w=800&auto=format&fit=crop",
      type: "Boutique",
      location: "London",
      buttonText: "Browse Vinyl"
    },
    {
      id: 52,
      name: "Holiday Gift Registry",
      category: "Registries",
      description: "Spread joy with a personalized gift list",
      price: "Custom",
      image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=800&auto=format&fit=crop",
      type: "Registry",
      buttonText: "View List"
    },
    {
      id: 53,
      name: "Designer Sunglasses",
      category: "Fashion",
      description: "UV protection with iconic style",
      price: "$275.00",
      image: "https://images.unsplash.com/photo-1511499767390-90342f54eb8d?q=80&w=800&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    {
      id: 54,
      name: "Wedding Planning Service",
      category: "Services",
      description: "Full coordination for your dream wedding",
      price: "$3500.00",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
      type: "Service",
      buttonText: "Consult Now"
    },
    {
      id: 55,
      name: "Urban Boutique",
      category: "Fashion",
      description: "Edgy fashion for the city dweller",
      price: "",
      image: "https://images.unsplash.com/photo-1470309634618-c6c88f4c18fe?q=80&w=800&auto=format&fit=crop",
      type: "Boutique",
      location: "New York",
      buttonText: "Shop Urban"
    },
    {
      id: 56,
      name: "Education Fund Registry",
      category: "Registries",
      description: "Support future learning and development",
      price: "Custom",
      image: "https://images.unsplash.com/photo-1523240715639-99f2f1e23ad6?q=80&w=800&auto=format&fit=crop",
      type: "Registry",
      buttonText: "Contribute"
    },
    {
      id: 57,
      name: "Smart Watch Elite",
      category: "Jewelry",
      description: "Health tracking with premium design",
      price: "$499.00",
      image: "https://images.unsplash.com/photo-1544117518-30dd5ff7a986?q=80&w=800&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    {
      id: 58,
      name: "Pet Sitting Service",
      category: "Services",
      description: "Trusted care for your furry friends while you're away",
      price: "$40/day",
      image: "https://images.unsplash.com/photo-1541599540903-216a46ca1df0?q=80&w=800&auto=format&fit=crop",
      type: "Service",
      buttonText: "Book Sitter"
    },
    {
      id: 59,
      name: "Sunset Coast Boutique",
      category: "Fashion",
      description: "Beachwear and coastal lifestyle apparel",
      price: "",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
      type: "Boutique",
      location: "Los Angeles",
      buttonText: "View Style"
    },
    {
      id: 60,
      name: "Home Renovation Registry",
      category: "Registries",
      description: "Help build the perfect living space",
      price: "Custom",
      image: "https://images.unsplash.com/photo-1503387762-592dee58c160?q=80&w=800&auto=format&fit=crop",
      type: "Registry",
      buttonText: "Start Project"
    },
    {
      id: 61,
      name: "Modern Art Print",
      category: "Home & Decor",
      description: "Limited edition abstract canvas",
      price: "$185.00",
      image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop",
      type: "Product",
      buttonText: "Add To Cart"
    },
    {
      id: 62,
      name: "Language Tutoring",
      category: "Services",
      description: "Master a new language with native speakers",
      price: "$50/hr",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop",
      type: "Service",
      buttonText: "Book Lesson"
    }
  ];

  const filteredResults = useMemo(() => {
    return staticResults.filter(item => {
      // Filter by Search Query
      const matchesQuery = !query || 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase());

      // Filter by Tab (Type)
      const tabToTypeMap: Record<string, string> = {
        "Products": "Product",
        "Services": "Service",
        "Boutiques": "Boutique",
        "Registries": "Registry"
      };
      const normalizedTab = tabToTypeMap[activeTab] || activeTab;
      const matchesTab = activeTab === "All" || item.type.toLowerCase() === normalizedTab.toLowerCase();

      // Filter by Category
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);

      // Filter by Location
      const matchesLocation = selectedLocations.length === 0 || (item.location && selectedLocations.includes(item.location));

      return matchesQuery && matchesTab && matchesCategory && matchesLocation;
    });
  }, [query, activeTab, selectedCategories, selectedLocations, staticResults]);

  const displayProducts = filteredResults;
  const totalPages = Math.ceil(displayProducts.length / itemsPerPage);
  
  const paginatedProducts = displayProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [query, activeTab, selectedCategories, selectedLocations, priceRange, availability, selectedRating]);

  return (
    <main className="min-h-screen bg-background">
      <LandingTopAnnouncementBar />
      <Navbar />

      <SearchHeader 
        query={query} 
        resultsCount={displayProducts.length} 
        onBack={() => router.back()} 
      />

      <div className="bg-background py-12 md:py-20 relative">
        {/* Floating Filter Tab Button for Mobile */}
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-[#A3A3A3] text-white pl-3 pr-5 py-4 rounded-r-full shadow-lg hover:bg-gray-500 transition-all active:scale-95 flex items-center justify-center"
          aria-label="Open Filters"
        >
          <Filter size={22} strokeWidth={1.5} />
        </button>

        <Container>
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Mobile Filter Drawer */}
            <AnimatePresence>
              {isFilterOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsFilterOpen(false)}
                    className="fixed inset-0 bg-black/40 z-[60] lg:hidden backdrop-blur-sm"
                  />
                  <motion.aside
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-white z-[70] lg:hidden overflow-y-auto p-6 shadow-2xl"
                  >
                    <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                      <h3 className="text-lg font-bold tracking-widest uppercase">Filters</h3>
                      <button 
                        onClick={() => setIsFilterOpen(false)}
                        className="p-2 hover:bg-gray-100 transition-colors rounded-full"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <SearchSidebar 
                      activeType={activeTab} 
                      setActiveType={setActiveTab} 
                      selectedCategories={selectedCategories}
                      setSelectedCategories={setSelectedCategories}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      availability={availability}
                      setAvailability={setAvailability}
                      selectedRating={selectedRating}
                      setSelectedRating={setSelectedRating}
                      selectedLocations={selectedLocations}
                      setSelectedLocations={setSelectedLocations}
                    />
                  </motion.aside>
                </>
              )}
            </AnimatePresence>

            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-[280px] flex-shrink-0">
               <SearchSidebar 
                activeType={activeTab} 
                setActiveType={setActiveTab} 
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                availability={availability}
                setAvailability={setAvailability}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
               />
            </aside>

            {/* Main Content Area */}
            <div className="flex-grow">
               <SearchSortBar 
                 viewMode={viewMode} 
                 setViewMode={setViewMode} 
                 itemsPerPage={itemsPerPage} 
               />

               {/* Tabs */}
               <div className="flex gap-2 mb-12 overflow-x-auto pb-4 scrollbar-hide border-b border-gray-100">
                 {tabs.map((tab) => (
                   <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-3 px-6 py-3 border transition-all whitespace-nowrap uppercase tracking-widest text-[12px] ${
                      activeTab === tab 
                        ? 'bg-[#F1EADA] border-[#D4C3A3] font-bold text-black' 
                        : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-black'
                    }`}
                   >
                     <span>{tab}</span>
                     <ChevronRight size={14} className={`rotate-90 transition-opacity ${activeTab === tab ? 'opacity-100' : 'opacity-30'}`} />
                   </button>
                 ))}
                 <button className="px-6 py-3 border border-gray-200 bg-[#F1EADA] text-[12px] font-bold uppercase tracking-widest ml-auto hover:bg-[#EAE0CD] transition-colors shadow-sm">
                   Clear Filter
                 </button>
               </div>

               <SearchProductGrid 
                 products={paginatedProducts} 
                 viewMode={viewMode} 
                 query={query} 
               />

               <SearchPagination 
                 currentPage={currentPage} 
                 totalPages={totalPages} 
                 onPageChange={setCurrentPage} 
               />
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
};

export default SearchPage;
