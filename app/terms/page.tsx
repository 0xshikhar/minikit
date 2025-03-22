import { FC } from 'react'
import { Container, Title, Text } from '@/components/ui'


const TermsPage: FC = () => {
    return (
        <Container>
            <Title>Terms of Service</Title>
            <Text>
                Welcome to ProofProtocol. By using our services, you agree to these Terms of Service.
            </Text>
            <Text>
                <strong>Acceptance of Terms:</strong> By accessing or using ProofProtocol, you agree to be bound by these Terms and our Privacy Policy.
            </Text>
            <Text>
                <strong>User Accounts:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </Text>
            <Text>
                <strong>Acceptable Use:</strong> You agree not to use our services for any illegal or unauthorized purpose, or to violate any laws in your jurisdiction.
            </Text>
            <Text>
                <strong>Intellectual Property:</strong> Our services and content are protected by copyright, trademark, and other intellectual property laws.
            </Text>
            <Text>
                <strong>Limitation of Liability:</strong> ProofProtocol shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
            </Text>
            <Text>
                <strong>Termination:</strong> We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason.
            </Text>
            <Text>
                <strong>Changes to Terms:</strong> We reserve the right to modify these terms at any time. Your continued use of the service constitutes acceptance of the updated terms.
            </Text>
            <Text>
                <strong>Governing Law:</strong> These Terms shall be governed by the laws of the jurisdiction in which ProofProtocol operates, without regard to its conflict of law provisions.
            </Text>
        </Container>
    )
}

export default TermsPage
