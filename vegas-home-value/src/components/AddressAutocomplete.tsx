"use client"

import { useState, useEffect, useRef } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { Input } from "@/components/ui/input"

interface AddressAutocompleteProps {
  onAddressSelect: (address: string, placeDetails?: google.maps.places.PlaceResult) => void
  placeholder?: string
  className?: string
}

interface AddressSuggestion {
  description: string
  place_id: string
}

export function AddressAutocomplete({
  onAddressSelect,
  placeholder = "Enter your home address",
  className
}: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null)
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null)

  useEffect(() => {
    const initializeGoogleMaps = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "demo",
          version: "weekly",
          libraries: ["places"]
        })

        await loader.load()

        autocompleteServiceRef.current = new google.maps.places.AutocompleteService()

        // Create a dummy div for PlacesService
        const dummyDiv = document.createElement('div')
        placesServiceRef.current = new google.maps.places.PlacesService(dummyDiv)
      } catch (error) {
        console.log("Google Maps API not available, using mock data")
        // Fallback for demo purposes
      }
    }

    initializeGoogleMaps()
  }, [])

  const searchAddresses = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    setIsLoading(true)

    try {
      if (autocompleteServiceRef.current) {
        // Use real Google Places API
        autocompleteServiceRef.current.getPlacePredictions(
          {
            input: query,
            types: ['address'],
            componentRestrictions: { country: 'us' },
          },
          (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
              const limitedSuggestions = predictions.slice(0, 4).map(prediction => ({
                description: prediction.description,
                place_id: prediction.place_id
              }))
              setSuggestions(limitedSuggestions)
              setShowSuggestions(true)
            } else {
              setSuggestions([])
              setShowSuggestions(false)
            }
            setIsLoading(false)
          }
        )
      } else {
        // Demo fallback data
        const mockSuggestions = [
          { description: `${query} Street, Los Angeles, CA, USA`, place_id: "demo1" },
          { description: `${query} Avenue, San Diego, CA, USA`, place_id: "demo2" },
          { description: `${query} Boulevard, San Francisco, CA, USA`, place_id: "demo3" },
          { description: `${query} Drive, Sacramento, CA, USA`, place_id: "demo4" }
        ].filter(item =>
          item.description.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 4)

        setSuggestions(mockSuggestions)
        setShowSuggestions(mockSuggestions.length > 0)
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error fetching address suggestions:", error)
      setSuggestions([])
      setShowSuggestions(false)
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    searchAddresses(value)
  }

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    setInputValue(suggestion.description)
    setSuggestions([])
    setShowSuggestions(false)
    onAddressSelect(suggestion.description)

    // Get place details if using real API
    if (placesServiceRef.current && suggestion.place_id !== "demo1" && !suggestion.place_id.startsWith("demo")) {
      placesServiceRef.current.getDetails(
        { placeId: suggestion.place_id },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            onAddressSelect(suggestion.description, place)
          }
        }
      )
    }
  }

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false)
    }, 200)
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 mt-1">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.place_id}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 text-sm text-gray-700"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.description}
            </div>
          ))}
        </div>
      )}

      {isLoading && inputValue.length >= 3 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 mt-1">
          <div className="px-4 py-3 text-sm text-gray-500">
            Searching addresses...
          </div>
        </div>
      )}
    </div>
  )
}
