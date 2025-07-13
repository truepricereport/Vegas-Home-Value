"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AddressAutocomplete } from "@/components/AddressAutocomplete"
import { useState } from "react"

export function HeroSection() {
  const [selectedAddress, setSelectedAddress] = useState("")

  const handleAddressSelect = (address: string, placeDetails?: google.maps.places.PlaceResult) => {
    setSelectedAddress(address)
    console.log("Selected address:", address)
    if (placeDetails) {
      console.log("Place details:", placeDetails)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedAddress) {
      // Here you would typically send the address to your backend
      alert(`Processing request for: ${selectedAddress}`)
    } else {
      alert("Please select an address first")
    }
  }

  return (
    <section className="bg-[#767676] min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="bg-white rounded-2xl p-12 max-w-2xl w-full text-center shadow-lg">
        <div className="mb-8">
          <Image
            src="https://ext.same-assets.com/2983890396/2132483316.png"
            alt="True Price Report"
            width={200}
            height={60}
            className="h-16 w-auto mx-auto mb-8"
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Get Your FREE Report to find out:
        </h1>

        <ul className="text-left text-gray-700 space-y-2 mb-10 max-w-lg mx-auto text-base leading-relaxed">
          <li>• What's My Home Worth Today?</li>
          <li>• How Is the Market Affecting My Property Value?</li>
          <li>• What could I walk away with if I sold it on the Market?</li>
          <li>• Will my home profit as a rental?</li>
          <li>• What Would a Cash Offer Look Like?</li>
        </ul>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <AddressAutocomplete
            onAddressSelect={handleAddressSelect}
            placeholder="Enter your home address"
            className="flex-1 h-12 px-4 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0f6c0c] focus:border-transparent"
          />
          <Button
            type="submit"
            className="bg-[#0f6c0c] hover:bg-[#0d5a0a] text-white h-12 px-8 rounded font-medium whitespace-nowrap"
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  )
}
