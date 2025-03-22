import { FC } from 'react'
import { Container, Title, Text } from '@/components/ui'

const PrivacyPage: FC = () => {
    return (
        <Container>
            <Title>Privacy Policy</Title>
            <Text>
                At ProofProtocol, we value your privacy. This policy outlines how we collect, use, and protect your information.
            </Text>
            <Text>
                <strong>Information Collection:</strong> We collect information that you provide directly to us, such as when you create an account or interact with our services.
            </Text>
            <Text>
                <strong>Use of Information:</strong> We use your information to provide and improve our services, communicate with you, and comply with legal obligations.
            </Text>
            <Text>
                <strong>Data Protection:</strong> We implement appropriate security measures to protect your information from unauthorized access and disclosure.
            </Text>
            <Text>
                <strong>Your Rights:</strong> You have the right to access, correct, or delete your personal information. Please contact us for any requests.
            </Text>
            <Text>
                <strong>Changes to This Policy:</strong> We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </Text>
        </Container>
    )
}

export default PrivacyPage
