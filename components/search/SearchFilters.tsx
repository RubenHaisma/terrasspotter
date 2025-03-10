"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useFilterStore } from "@/lib/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const amenities = [
  "WiFi",
  "Power Outlet",
  "Heating",
  "Umbrella",
  "Shade",
  "Water",
];

export function SearchFilters() {
  const {
    priceRange,
    capacity,
    amenities: selectedAmenities,
    setPriceRange,
    setCapacity,
    setAmenities,
    resetFilters,
  } = useFilterStore();

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <Label>Price Range (€)</Label>
        <div className="flex items-center gap-4">
          <Input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="w-20"
          />
          <Slider
            min={0}
            max={100}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
            className="flex-1"
          />
          <Input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-20"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Minimum Capacity</Label>
        <Select
          value={String(capacity)}
          onValueChange={(value) => setCapacity(Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select capacity" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <SelectItem key={num} value={String(num)}>
                {num} {num === 1 ? "person" : "people"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Amenities</Label>
        <div className="grid grid-cols-2 gap-2">
          {amenities.map((amenity) => (
            <Button
              key={amenity}
              variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
              onClick={() => {
                if (selectedAmenities.includes(amenity)) {
                  setAmenities(selectedAmenities.filter((a) => a !== amenity));
                } else {
                  setAmenities([...selectedAmenities, amenity]);
                }
              }}
              className="justify-start"
            >
              {amenity}
            </Button>
          ))}
        </div>
      </div>

      <Button onClick={resetFilters} variant="outline" className="w-full">
        Reset Filters
      </Button>
    </div>
  );
}