import { useMemo, useState } from 'react'
import { siteConfig } from '../data/siteConfig'

const itemTypes = ['Plush Animal', 'Blanket', 'Baby / Nursery Item', 'Scrunchie', 'Other']

function InquiryForm({ mode = 'custom', initialItem = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    itemType: initialItem ? 'Other' : 'Plush Animal',
    desiredSize: '',
    desiredColors: '',
    notes: initialItem ? `I am interested in something like: ${initialItem}` : '',
    budget: '',
    neededBy: '',
    message: '',
  })

  const isContact = mode === 'contact'

  const mailtoHref = useMemo(() => {
    const subject = isContact
      ? 'Cape Cod Cozy Toes Contact Inquiry'
      : `Custom Knit Inquiry - ${formData.itemType}`

    const lines = isContact
      ? [
          `Name: ${formData.name}`,
          `Email: ${formData.email}`,
          `Phone: ${formData.phone || 'Not provided'}`,
          '',
          'Message:',
          formData.message,
        ]
      : [
          `Name: ${formData.name}`,
          `Email: ${formData.email}`,
          `Phone: ${formData.phone || 'Not provided'}`,
          `Item type: ${formData.itemType}`,
          `Requested item/reference: ${initialItem || 'Not provided'}`,
          `Desired size: ${formData.desiredSize}`,
          `Desired colors: ${formData.desiredColors}`,
          `Budget range: ${formData.budget || 'Not provided'}`,
          `Needed-by date: ${formData.neededBy || 'Not provided'}`,
          '',
          'Inspiration / notes:',
          formData.notes,
        ]

    return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
  }, [formData, initialItem, isContact])

  const updateField = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  return (
    <form className="inquiry-form" action={mailtoHref} method="post" encType="text/plain">
      {initialItem && !isContact && (
        <div className="form-highlight">
          Asking about: <strong>{initialItem}</strong>
        </div>
      )}

      <div className="form-grid">
        <label>
          Name
          <input name="name" value={formData.name} onChange={updateField} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={updateField} required />
        </label>
        <label>
          Phone <span>optional</span>
          <input type="tel" name="phone" value={formData.phone} onChange={updateField} />
        </label>

        {!isContact && (
          <>
            <label>
              Item type
              <select name="itemType" value={formData.itemType} onChange={updateField}>
                {itemTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
            <label>
              Desired size
              <input name="desiredSize" value={formData.desiredSize} onChange={updateField} placeholder="Baby, throw, XL/king, accessory size..." />
            </label>
            <label>
              Desired colors
              <input name="desiredColors" value={formData.desiredColors} onChange={updateField} placeholder="Seafoam, ivory, blush, custom palette..." />
            </label>
            <label>
              Budget range <span>optional</span>
              <input name="budget" value={formData.budget} onChange={updateField} placeholder="$50-$100, $200+, etc." />
            </label>
            <label>
              Needed-by date <span>optional</span>
              <input type="date" name="neededBy" value={formData.neededBy} onChange={updateField} />
            </label>
          </>
        )}
      </div>

      <label className="full-width">
        {isContact ? 'Message' : 'Inspiration / notes'}
        <textarea
          name={isContact ? 'message' : 'notes'}
          value={isContact ? formData.message : formData.notes}
          onChange={updateField}
          rows="6"
          required
          placeholder={isContact ? 'How can we help?' : 'Tell us about colors, texture, theme, inspiration photos, recipient, or matching room decor.'}
        />
      </label>

      <div className="form-actions">
        <button className="btn btn--dark" type="submit">Open Email Draft</button>
        <p>This static form opens your email app with the details prefilled.</p>
      </div>
    </form>
  )
}

export default InquiryForm
