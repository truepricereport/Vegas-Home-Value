'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GoogleMap from "@/components/GoogleMap"
import { Menu } from "lucide-react"

interface FormData {
  // Step 1
  streetAddress: string
  unitNumber: string
  city: string
  state: string
  country: string
  zipcode: string
  // Step 2
  beds: string
  baths: string
  // Step 3
  firstName: string
  lastName: string
  phone: string
  email: string
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    streetAddress: '',
    unitNumber: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    beds: '',
    baths: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  })

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)

    // Create URL parameters for the results page
    const params = new URLSearchParams({
      first_name: formData.firstName,
      address: formData.streetAddress + (formData.unitNumber ? ` ${formData.unitNumber}` : ''),
      city: formData.city,
      state: formData.state,
      zipcode: formData.zipcode,
      beds: formData.beds,
      baths: formData.baths,
      email: formData.email,
      phone: formData.phone
    })

    // Redirect to results page
    window.location.href = `/results?${params.toString()}`
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-gray-200">
      {/* Header */}
      <header className="bg-white/80 border-b shadow-sm sticky top-0 z-10 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-4xl">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://ext.same-assets.com/2983890396/1545589317.png"
              alt="True Price Report"
              className="h-12"
            />
          </div>

          {/* Main Menu Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
                Main Menu
                <Menu className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Find Value</DropdownMenuItem>
              <DropdownMenuItem>Disclosure</DropdownMenuItem>
              <DropdownMenuItem>Privacy Policy</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-8 px-2">
        <div className="w-full max-w-lg mx-auto">
          <Card className="bg-white/90 shadow-2xl rounded-2xl border border-gray-200">
            <CardContent className="p-6 sm:p-8">
              {/* True Price Report Logo in content */}
              <div className="flex flex-col items-center mb-8">
                <img
                  src="https://ext.same-assets.com/2983890396/1545589317.png"
                  alt="True Price Report"
                  className="h-16 w-auto mb-4 drop-shadow-lg"
                />
              </div>

              {/* Main Heading */}
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  This is Your Home, Correct?
                </h1>
                <h2 className="text-lg sm:text-xl text-green-600 font-semibold">
                  2159-2111 Point Mallard Dr
                </h2>
              </div>

              {/* Google Maps Section */}
              <div className="mb-8">
                <div className="w-full h-48 sm:h-64 bg-gray-200 rounded-lg overflow-hidden border border-gray-300">
                  <GoogleMap />
                </div>
              </div>

              {/* Multi-Step Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Confirm Address */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                      Step 1: Confirm Address
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="street_address" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <Input
                          id="street_address"
                          type="text"
                          className="w-full"
                          placeholder="Enter street address"
                          value={formData.streetAddress}
                          onChange={(e) => updateFormData('streetAddress', e.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="unit_number" className="block text-sm font-medium text-gray-700 mb-1">
                          Unit Number
                        </label>
                        <Input
                          id="unit_number"
                          type="text"
                          className="w-full"
                          placeholder="Enter unit number"
                          value={formData.unitNumber}
                          onChange={(e) => updateFormData('unitNumber', e.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <Input
                          id="city"
                          type="text"
                          className="w-full"
                          placeholder="Enter city"
                          value={formData.city}
                          onChange={(e) => updateFormData('city', e.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <Input
                          id="state"
                          type="text"
                          className="w-full"
                          placeholder="Enter state"
                          value={formData.state}
                          onChange={(e) => updateFormData('state', e.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <Input
                          id="country"
                          type="text"
                          className="w-full"
                          placeholder="Enter country"
                          value={formData.country}
                          onChange={(e) => updateFormData('country', e.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">
                          Zipcode
                        </label>
                        <Input
                          id="zipcode"
                          type="text"
                          className="w-full"
                          placeholder="Enter zipcode"
                          value={formData.zipcode}
                          onChange={(e) => updateFormData('zipcode', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded w-full sm:w-auto"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Home Basics */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                      Step 2: Home Basics
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="beds" className="block text-sm font-medium text-gray-700 mb-1">
                          Beds
                        </label>
                        <Select value={formData.beds} onValueChange={(value) => updateFormData('beds', value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select number of beds" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                            <SelectItem value="7">7</SelectItem>
                            <SelectItem value="8">8</SelectItem>
                            <SelectItem value="9+">9+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label htmlFor="baths" className="block text-sm font-medium text-gray-700 mb-1">
                          Baths
                        </label>
                        <Select value={formData.baths} onValueChange={(value) => updateFormData('baths', value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select number of baths" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="1.5">1.5</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="2.5">2.5</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="3.5">3.5</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="4.5">4.5</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                            <SelectItem value="6.5">6.5</SelectItem>
                            <SelectItem value="7">7</SelectItem>
                            <SelectItem value="7.5">7.5</SelectItem>
                            <SelectItem value="8">8</SelectItem>
                            <SelectItem value="8.5">8.5</SelectItem>
                            <SelectItem value="9+">9+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="px-8 py-2 w-full sm:w-auto"
                      >
                        Previous
                      </Button>
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded w-full sm:w-auto"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirm Your Information */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                      Step 3: Confirm Your Information
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <Input
                          id="first_name"
                          type="text"
                          className="w-full"
                          placeholder="Enter first name"
                          value={formData.firstName}
                          onChange={(e) => updateFormData('firstName', e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <Input
                          id="last_name"
                          type="text"
                          className="w-full"
                          placeholder="Enter last name"
                          value={formData.lastName}
                          onChange={(e) => updateFormData('lastName', e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          className="w-full"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          className="w-full"
                          placeholder="Enter email address"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="px-8 py-2 w-full sm:w-auto"
                      >
                        Previous
                      </Button>
                      <Button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded w-full sm:w-auto"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                )}
              </form>

              {/* Disclaimer - Show on all steps */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  By submitting my information in this form, I agree to be contacted by licensed providers.
                  I also agree to be contacted via call or text manual and/or automatic to my cell phone provided,
                  in order to receive the information requested above.
                </p>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-3">
                  Upon submission of your information, you will be directed to a home value report sponsored by a
                  Nevada based licensed Sponsor of TruePriceReport to obtain feedback, verify accuracy, answer
                  specific questions related to the report. If you are not based in Nevada or researching Real Estate
                  out of Nevada you may request a local Licensee when contacted. You may opt out of contact at any time.
                  The report is generated using several data aggregators of public information and cannot be guaranteed
                  to be accurate, which is why we will call to correct if you feel price is inaccurate, however the
                  automatic price should not be relied upon for making any financial decisions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-0">
              <span className="text-white font-semibold">True Price Report</span>
              <a href="#" className="text-gray-300 hover:text-white transition">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Disclosure</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-300">Powered By:</span>
              <div className="flex items-center gap-2">
                <img
                  src="https://ext.same-assets.com/2983890396/2120930438.png"
                  alt="MLS"
                  className="h-8 w-auto"
                />
                <img
                  src="https://ext.same-assets.com/2983890396/59346948.png"
                  alt="Realtor"
                  className="h-8 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
